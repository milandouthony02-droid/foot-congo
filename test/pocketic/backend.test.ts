import { PocketIc } from "@dfinity/pic";
import type { Actor, CanisterFixture } from "@dfinity/pic";
import { afterAll, beforeAll, expect, it } from "vitest";

import { idlFactory } from "../../src/frontend/src/declarations/backend.did.js";
import type { _SERVICE } from "../../src/frontend/src/declarations/backend.did";

const PIC_URL = process.env.POCKET_IC_URL ?? "";
const BACKEND_WASM = process.env.BACKEND_WASM ?? "";

let pic: PocketIc | undefined;
let actor: Actor<_SERVICE>;
let canisterId: CanisterFixture<_SERVICE>["canisterId"];

beforeAll(async () => {
  pic = await PocketIc.create(PIC_URL);
  ({ actor, canisterId } = await pic.setupCanister<_SERVICE>({
    idlFactory,
    wasm: BACKEND_WASM,
  }));
});

afterAll(async () => {
  // `?.` because `beforeAll` may not have got that far. A failed
  // `PocketIc.create` otherwise stacks "Cannot read properties of undefined"
  // on top of the real error and buries the one line that explains the run.
  await pic?.tearDown();
});

it("answers every public read the app consumes instead of trapping", async () => {
  // One call per public method the acceptance criteria touch. A canister whose
  // methods are unimplemented stubs traps here rather than in front of a user.
  await expect(actor.listNews()).resolves.toBeInstanceOf(Array);
  await expect(actor.listMatches([], [])).resolves.toBeInstanceOf(Array);
  await expect(actor.listCompetitions()).resolves.toBeInstanceOf(Array);
  await expect(actor.listTeams()).resolves.toBeInstanceOf(Array);
  await expect(actor.listPlayers([], [])).resolves.toBeInstanceOf(Array);
  await expect(actor.listAdSlots()).resolves.toBeInstanceOf(Array);
  await expect(actor.getApiDoc()).resolves.toEqual(expect.any(String));
});

it("serves the seeded news feed with detail lookups", async () => {
  const news = await actor.listNews();
  expect(news.length).toBeGreaterThan(0);

  const first = news[0];
  const fetched = await actor.getNews(first.id);
  expect(fetched).toHaveLength(1);
  expect(fetched[0]).toMatchObject({ id: first.id, title: first.title });
});

it("filters matches by status and competition", async () => {
  const all = await actor.listMatches([], []);
  expect(all.length).toBeGreaterThan(0);

  const finished = await actor.listMatches([], [{ finished: null }]);
  expect(finished.length).toBeGreaterThan(0);
  expect(finished.every((m) => "finished" in m.status)).toBe(true);

  const competitions = await actor.listCompetitions();
  expect(competitions.length).toBeGreaterThan(0);
  const byCompetition = await actor.listMatches([competitions[0]], []);
  expect(byCompetition.every((m) => m.competition === competitions[0])).toBe(
    true,
  );
});

it("serves a standings table per competition", async () => {
  const competitions = await actor.listCompetitions();
  const standing = await actor.getStanding(competitions[0]);
  expect(standing).toHaveLength(1);
  expect(standing[0].rows.length).toBeGreaterThan(0);
  expect(standing[0].rows[0]).toMatchObject({
    position: 1n,
    teamName: expect.any(String),
  });
});

it("serves teams and players with detail lookups and filters", async () => {
  const teams = await actor.listTeams();
  expect(teams.length).toBeGreaterThan(0);
  const team = await actor.getTeam(teams[0].id);
  expect(team).toHaveLength(1);
  expect(team[0].name).toBe(teams[0].name);

  const players = await actor.listPlayers([], []);
  expect(players.length).toBeGreaterThan(0);
  const player = await actor.getPlayer(players[0].id);
  expect(player).toHaveLength(1);
  expect(player[0].name).toBe(players[0].name);

  const byTeam = await actor.listPlayers([], [teams[0].name]);
  expect(byTeam.every((p) => p.teamName === teams[0].name)).toBe(true);
});

it("returns an empty option for an unknown id instead of trapping", async () => {
  await expect(actor.getNews(999_999n)).resolves.toEqual([]);
  await expect(actor.getMatch(999_999n)).resolves.toEqual([]);
  await expect(actor.getTeam(999_999n)).resolves.toEqual([]);
  await expect(actor.getPlayer(999_999n)).resolves.toEqual([]);
  await expect(actor.getStanding("Compétition inexistante")).resolves.toEqual(
    [],
  );
});

it("exposes reserved ad slots", async () => {
  const slots = await actor.listAdSlots();
  expect(slots.length).toBeGreaterThan(0);
  expect(slots[0]).toMatchObject({
    id: expect.any(String),
    placement: expect.any(String),
    enabled: expect.any(Boolean),
  });
});

// `canisterId` is kept so a second actor could be created for the same canister
// if a caller-isolation test is ever needed; this backend has no per-caller
// state, so none is written.
void canisterId;

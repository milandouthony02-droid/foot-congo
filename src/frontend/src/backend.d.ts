import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AdSlot {
    id: string;
    placement: string;
    targetUrl: string;
    enabled: boolean;
    imageUrl: string;
}
export interface Cell {
    value: Value;
    name: string;
}
export type Error_ = {
    __kind__: "FrontendOriginsNotConfigured";
    FrontendOriginsNotConfigured: null;
} | {
    __kind__: "MixedSsoSources";
    MixedSsoSources: {
        otherKeys: Array<string>;
        ssoKeys: Array<string>;
    };
} | {
    __kind__: "Stale";
    Stale: {
        ageNs: bigint;
    };
} | {
    __kind__: "MalformedCandid";
    MalformedCandid: null;
} | {
    __kind__: "AmbiguousAttribute";
    AmbiguousAttribute: {
        field: string;
        sources: Array<string>;
    };
} | {
    __kind__: "NoAttributes";
    NoAttributes: null;
} | {
    __kind__: "UnknownNonce";
    UnknownNonce: null;
} | {
    __kind__: "UntrustedSsoSource";
    UntrustedSsoSource: {
        domain: string;
    };
} | {
    __kind__: "MissingField";
    MissingField: string;
} | {
    __kind__: "FrontendOriginMismatch";
    FrontendOriginMismatch: {
        got: string;
        expected: Array<string>;
    };
};
export interface Lineup {
    away: Array<string>;
    home: Array<string>;
}
export interface Match {
    id: MatchId;
    status: MatchStatus;
    homeTeam: string;
    scorers: Array<Scorer>;
    summary: string;
    competition: string;
    homeScore?: bigint;
    kickoff: Timestamp;
    awayTeam: string;
    awayScore?: bigint;
    lineup: Lineup;
}
export type MatchId = bigint;
export interface News {
    id: NewsId;
    title: string;
    content: string;
    publishedAt: Timestamp;
    summary: string;
    category: string;
    image: string;
}
export type NewsId = bigint;
export interface Player {
    id: PlayerId;
    teamName: string;
    name: string;
    stats: PlayerStats;
    photo: string;
    position: string;
}
export type PlayerId = bigint;
export interface PlayerStats {
    assists: bigint;
    matches: bigint;
    goals: bigint;
}
export interface Result {
    hasMore: boolean;
    rows: Array<Array<Cell>>;
}
export type Result__1 = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: Error_;
};
export interface Scorer {
    teamName: string;
    minute: bigint;
    playerName: string;
}
export interface Standing {
    rows: Array<StandingRow>;
    competition: string;
}
export interface StandingRow {
    won: bigint;
    teamName: string;
    played: bigint;
    lost: bigint;
    position: bigint;
    drawn: bigint;
    points: bigint;
}
export interface Team {
    id: TeamId;
    city: string;
    logo: string;
    name: string;
    squad: Array<string>;
}
export type TeamId = bigint;
export type Timestamp = bigint;
export type Value = {
    __kind__: "int";
    int: bigint;
} | {
    __kind__: "nat";
    nat: bigint;
} | {
    __kind__: "float";
    float: number;
} | {
    __kind__: "bool";
    bool: boolean;
} | {
    __kind__: "null";
    null: null;
} | {
    __kind__: "text";
    text: string;
};
export enum MatchStatus {
    upcoming = "upcoming",
    live = "live",
    finished = "finished"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    execute(qJson: string): Promise<Result>;
    getApiDoc(): Promise<string>;
    getCallerUserRole(): Promise<UserRole>;
    getMatch(id: MatchId): Promise<Match | null>;
    getNews(id: NewsId): Promise<News | null>;
    getPlayer(id: PlayerId): Promise<Player | null>;
    getStanding(competition: string): Promise<Standing | null>;
    getTeam(id: TeamId): Promise<Team | null>;
    isCallerAdmin(): Promise<boolean>;
    listAdSlots(): Promise<Array<AdSlot>>;
    listCompetitions(): Promise<Array<string>>;
    listMatches(competition: string | null, status: MatchStatus | null): Promise<Array<Match>>;
    listNews(): Promise<Array<News>>;
    listPlayers(position: string | null, teamName: string | null): Promise<Array<Player>>;
    listTeams(): Promise<Array<Team>>;
    schema(): Promise<string>;
}

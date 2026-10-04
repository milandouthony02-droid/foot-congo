import type {
  Match,
  MatchId,
  MatchStatus,
  News,
  NewsId,
  Player,
  PlayerId,
  Standing,
  Team,
  TeamId,
} from "@/backend";
import { useQuery } from "@tanstack/react-query";
import { useBackend } from "./useBackend";

export function useNewsList() {
  const { actor, isFetching } = useBackend();
  return useQuery<News[]>({
    queryKey: ["news"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listNews();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useNewsItem(id: NewsId) {
  const { actor, isFetching } = useBackend();
  return useQuery<News | null>({
    queryKey: ["news", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getNews(id);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMatches(
  competition: string | null = null,
  status: MatchStatus | null = null,
) {
  const { actor, isFetching } = useBackend();
  return useQuery<Match[]>({
    queryKey: ["matches", competition, status],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMatches(competition, status);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMatch(id: MatchId) {
  const { actor, isFetching } = useBackend();
  return useQuery<Match | null>({
    queryKey: ["match", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMatch(id);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCompetitions() {
  const { actor, isFetching } = useBackend();
  return useQuery<string[]>({
    queryKey: ["competitions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listCompetitions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useStanding(competition: string) {
  const { actor, isFetching } = useBackend();
  return useQuery<Standing | null>({
    queryKey: ["standing", competition],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getStanding(competition);
    },
    enabled: !!actor && !isFetching && competition.length > 0,
  });
}

export function useTeams() {
  const { actor, isFetching } = useBackend();
  return useQuery<Team[]>({
    queryKey: ["teams"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listTeams();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTeam(id: TeamId) {
  const { actor, isFetching } = useBackend();
  return useQuery<Team | null>({
    queryKey: ["team", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getTeam(id);
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePlayers(
  position: string | null = null,
  teamName: string | null = null,
) {
  const { actor, isFetching } = useBackend();
  return useQuery<Player[]>({
    queryKey: ["players", position, teamName],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPlayers(position, teamName);
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePlayer(id: PlayerId) {
  const { actor, isFetching } = useBackend();
  return useQuery<Player | null>({
    queryKey: ["player", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getPlayer(id);
    },
    enabled: !!actor && !isFetching,
  });
}

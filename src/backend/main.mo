import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Expose "mo:caffeineai-oql/Expose";
import Entity "mo:caffeineai-oql/Entity";
import ListEntity "mo:caffeineai-oql/ListEntity";
import RecordValue "mo:caffeineai-oql/RecordValue";
import NatValue "mo:caffeineai-oql/NatValue";
import IntValue "mo:caffeineai-oql/IntValue";
import TextValue "mo:caffeineai-oql/TextValue";
import BoolValue "mo:caffeineai-oql/BoolValue";
import List "mo:core/List";

import NewsTypes "types/news";
import MatchTypes "types/matches";
import StandingTypes "types/standings";
import TeamTypes "types/teams";
import PlayerTypes "types/players";
import AdTypes "types/ads";

import NewsApi "mixins/news-api";
import MatchesApi "mixins/matches-api";
import StandingsApi "mixins/standings-api";
import TeamsApi "mixins/teams-api";
import PlayersApi "mixins/players-api";
import AdsApi "mixins/ads-api";
import ApiDocMixin "mixins/api-doc";

actor {
  let accessControlState : AccessControl.AccessControlState;

  let news : List.List<NewsTypes.News>;
  let matches : List.List<MatchTypes.Match>;
  let standings : List.List<StandingTypes.Standing>;
  let teams : List.List<TeamTypes.Team>;
  let players : List.List<PlayerTypes.Player>;
  let adSlots : List.List<AdTypes.AdSlot>;

  include MixinAuthorization(accessControlState, null);
  include Expose({
    entities = [
      news.toEntity("news", "News", "id")
        .sample({
          id = 0;
          title = "";
          summary = "";
          content = "";
          image = "";
          publishedAt = 0;
          category = "";
        })
        .public_()
        .build(),
      matches.toEntityManual("match", "Match", "id")
        .sample({
          id = 0;
          competition = "";
          homeTeam = "";
          awayTeam = "";
          homeScore = null;
          awayScore = null;
          status = #upcoming;
          kickoff = 0;
          scorers = [];
          summary = "";
          lineup = { home = []; away = [] };
        })
        .payload("competition", func m = m.competition)
        .payload("homeTeam", func m = m.homeTeam)
        .payload("awayTeam", func m = m.awayTeam)
        .payload("homeScore", func m = m.homeScore ?? 0)
        .payload("awayScore", func m = m.awayScore ?? 0)
        .payload("status", func m = switch (m.status) {
          case (#upcoming) "upcoming";
          case (#live) "live";
          case (#finished) "finished";
        })
        .payload("kickoff", func m = m.kickoff)
        .payload("scorerCount", func m = m.scorers.size())
        .payload("summary", func m = m.summary)
        .public_()
        .build(),
      teams.toEntityManual("team", "Team", "id")
        .sample({ id = 0; name = ""; city = ""; logo = ""; squad = [] })
        .payload("name", func t = t.name)
        .payload("city", func t = t.city)
        .payload("logo", func t = t.logo)
        .payload("squadSize", func t = t.squad.size())
        .public_()
        .build(),
      players.toEntityManual("player", "Player", "id")
        .sample({
          id = 0;
          name = "";
          position = "";
          teamName = "";
          photo = "";
          stats = { goals = 0; assists = 0; matches = 0 };
        })
        .payload("name", func p = p.name)
        .payload("position", func p = p.position)
        .payload("teamName", func p = p.teamName)
        .payload("photo", func p = p.photo)
        .payload("goals", func p = p.stats.goals)
        .payload("assists", func p = p.stats.assists)
        .payload("matches", func p = p.stats.matches)
        .public_()
        .build(),
      standings.toEntityManual("standing", "Standing", "competition")
        .sample({ competition = ""; rows = [] })
        .payload("competition", func s = s.competition)
        .payload("rowCount", func s = s.rows.size())
        .public_()
        .build(),
      adSlots.toEntity("adSlot", "AdSlot", "id")
        .sample({ id = ""; placement = ""; enabled = false; imageUrl = ""; targetUrl = "" })
        .public_()
        .build(),
    ];
  });

  include NewsApi(news);
  include MatchesApi(matches);
  include StandingsApi(standings);
  include TeamsApi(teams);
  include PlayersApi(players);
  include AdsApi(adSlots);
  include ApiDocMixin();
};

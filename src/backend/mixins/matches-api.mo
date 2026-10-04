import List "mo:core/List";
import Types "../types/matches";
import MatchesLib "../lib/matches";

mixin (matches : List.List<Types.Match>) {
  public query func listMatches(competition : ?Text, status : ?Types.MatchStatus) : async [Types.Match] {
    MatchesLib.listMatches(matches, competition, status);
  };

  public query func getMatch(id : Types.MatchId) : async ?Types.Match {
    MatchesLib.getMatch(matches, id);
  };

  public query func listCompetitions() : async [Text] {
    MatchesLib.listCompetitions(matches);
  };
};

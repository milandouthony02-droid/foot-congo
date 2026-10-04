import List "mo:core/List";
import Set "mo:core/Set";
import Types "../types/matches";

module {
  public func listMatches(
    matches : List.List<Types.Match>,
    competition : ?Text,
    status : ?Types.MatchStatus,
  ) : [Types.Match] {
    matches.toArray().filter(
      func item {
        let competitionOk = switch (competition) {
          case (?c) { item.competition == c };
          case null { true };
        };
        let statusOk = switch (status) {
          case (?s) { item.status == s };
          case null { true };
        };
        competitionOk and statusOk;
      }
    );
  };

  public func getMatch(matches : List.List<Types.Match>, id : Types.MatchId) : ?Types.Match {
    matches.find(func item = item.id == id);
  };

  public func listCompetitions(matches : List.List<Types.Match>) : [Text] {
    let competitions = Set.empty<Text>();
    for (item in matches.values()) {
      competitions.add(item.competition);
    };
    competitions.toArray();
  };
};

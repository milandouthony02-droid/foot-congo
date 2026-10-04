import List "mo:core/List";
import Types "../types/standings";

module {
  public func getStanding(standings : List.List<Types.Standing>, competition : Text) : ?Types.Standing {
    standings.find(func standing = standing.competition == competition);
  };
};

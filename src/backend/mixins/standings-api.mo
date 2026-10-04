import List "mo:core/List";
import Types "../types/standings";
import StandingsLib "../lib/standings";

mixin (standings : List.List<Types.Standing>) {
  public query func getStanding(competition : Text) : async ?Types.Standing {
    StandingsLib.getStanding(standings, competition);
  };
};

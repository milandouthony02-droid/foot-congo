import List "mo:core/List";
import Types "../types/teams";
import TeamsLib "../lib/teams";

mixin (teams : List.List<Types.Team>) {
  public query func listTeams() : async [Types.Team] {
    TeamsLib.listTeams(teams);
  };

  public query func getTeam(id : Types.TeamId) : async ?Types.Team {
    TeamsLib.getTeam(teams, id);
  };
};

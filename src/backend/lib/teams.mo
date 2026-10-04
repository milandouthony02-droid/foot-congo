import List "mo:core/List";
import Types "../types/teams";

module {
  public func listTeams(teams : List.List<Types.Team>) : [Types.Team] {
    teams.toArray();
  };

  public func getTeam(teams : List.List<Types.Team>, id : Types.TeamId) : ?Types.Team {
    teams.find(func team = team.id == id);
  };
};

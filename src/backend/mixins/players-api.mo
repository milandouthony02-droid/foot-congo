import List "mo:core/List";
import Types "../types/players";
import PlayersLib "../lib/players";

mixin (players : List.List<Types.Player>) {
  public query func listPlayers(position : ?Text, teamName : ?Text) : async [Types.Player] {
    PlayersLib.listPlayers(players, position, teamName);
  };

  public query func getPlayer(id : Types.PlayerId) : async ?Types.Player {
    PlayersLib.getPlayer(players, id);
  };
};

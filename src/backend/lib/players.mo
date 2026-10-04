import List "mo:core/List";
import Types "../types/players";

module {
  public func listPlayers(
    players : List.List<Types.Player>,
    position : ?Text,
    teamName : ?Text,
  ) : [Types.Player] {
    players.toArray().filter(
      func player {
        let positionOk = switch (position) {
          case (?p) { player.position == p };
          case null { true };
        };
        let teamOk = switch (teamName) {
          case (?t) { player.teamName == t };
          case null { true };
        };
        positionOk and teamOk;
      }
    );
  };

  public func getPlayer(players : List.List<Types.Player>, id : Types.PlayerId) : ?Types.Player {
    players.find(func player = player.id == id);
  };
};

import Common "../types/common";

module {
  public type PlayerId = Common.Id;

  public type PlayerStats = {
    goals : Nat;
    assists : Nat;
    matches : Nat;
  };

  public type Player = {
    id : PlayerId;
    name : Text;
    position : Text;
    teamName : Text;
    photo : Text;
    stats : PlayerStats;
  };
};

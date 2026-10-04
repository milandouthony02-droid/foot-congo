module {
  public type StandingRow = {
    position : Nat;
    teamName : Text;
    played : Nat;
    won : Nat;
    drawn : Nat;
    lost : Nat;
    points : Nat;
  };

  public type Standing = {
    competition : Text;
    rows : [StandingRow];
  };
};

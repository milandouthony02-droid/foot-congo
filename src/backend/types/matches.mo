import Common "../types/common";

module {
  public type MatchId = Common.Id;

  public type MatchStatus = {
    #upcoming;
    #live;
    #finished;
  };

  public type Scorer = {
    playerName : Text;
    teamName : Text;
    minute : Nat;
  };

  public type Lineup = {
    home : [Text];
    away : [Text];
  };

  public type Match = {
    id : MatchId;
    competition : Text;
    homeTeam : Text;
    awayTeam : Text;
    homeScore : ?Nat;
    awayScore : ?Nat;
    status : MatchStatus;
    kickoff : Common.Timestamp;
    scorers : [Scorer];
    summary : Text;
    lineup : Lineup;
  };
};

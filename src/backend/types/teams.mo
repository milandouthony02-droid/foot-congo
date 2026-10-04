import Common "../types/common";

module {
  public type TeamId = Common.Id;

  public type Team = {
    id : TeamId;
    name : Text;
    city : Text;
    logo : Text;
    squad : [Text];
  };
};

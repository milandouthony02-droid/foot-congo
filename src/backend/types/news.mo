import Common "../types/common";

module {
  public type NewsId = Common.Id;

  public type News = {
    id : NewsId;
    title : Text;
    summary : Text;
    content : Text;
    image : Text;
    publishedAt : Common.Timestamp;
    category : Text;
  };
};

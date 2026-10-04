import List "mo:core/List";
import Types "../types/news";
import NewsLib "../lib/news";

mixin (news : List.List<Types.News>) {
  public query func listNews() : async [Types.News] {
    NewsLib.listNews(news);
  };

  public query func getNews(id : Types.NewsId) : async ?Types.News {
    NewsLib.getNews(news, id);
  };
};

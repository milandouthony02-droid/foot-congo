import List "mo:core/List";
import Types "../types/news";

module {
  public func listNews(news : List.List<Types.News>) : [Types.News] {
    news.toArray();
  };

  public func getNews(news : List.List<Types.News>, id : Types.NewsId) : ?Types.News {
    news.find(func item = item.id == id);
  };
};

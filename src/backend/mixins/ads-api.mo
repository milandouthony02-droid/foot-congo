import List "mo:core/List";
import Types "../types/ads";
import AdsLib "../lib/ads";

mixin (adSlots : List.List<Types.AdSlot>) {
  public query func listAdSlots() : async [Types.AdSlot] {
    AdsLib.listAdSlots(adSlots);
  };
};

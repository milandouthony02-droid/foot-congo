import List "mo:core/List";
import Types "../types/ads";

module {
  public func listAdSlots(adSlots : List.List<Types.AdSlot>) : [Types.AdSlot] {
    adSlots.toArray();
  };
};

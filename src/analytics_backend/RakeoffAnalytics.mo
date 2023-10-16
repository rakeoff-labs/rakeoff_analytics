import RakeoffStatisticsInterface "./RakeoffStatisticsInterface/statistics";
import RakeoffKernelInterface "./RakeoffKernelInterface/kernel";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Result "mo:base/Result";

actor RakeoffAnalytics {

  let RakeoffStatistics : RakeoffStatisticsInterface.Self = actor "jgvzt-eiaaa-aaaak-ae5kq-cai";

  public type RakeoffStats = {
    total_icp_stakers : Nat;
    total_icp_staked : Nat64;
    total_icp_rewarded : Nat64;
  };

  public shared func get_rakeoff_stats() : async RakeoffStats {
    let stats = await RakeoffStatistics.get_rakeoff_stats();
    return stats;
  };

  let rakeoffAnalyticsCanister : RakeoffKernelInterface.Self = actor "rktkb-jiaaa-aaaap-aa23a-cai";

  public type CanisterStats = {

    total_ckbtc_exchanged : Nat;
    icp_fees_collected : Nat64;
    icp_earned_from_swap : Nat64;
    last_winner : (Principal, Nat64);
    icp_in_lotto : Nat64;

  };

  public shared func getCanisterStats() : async CanisterStats {
    let kernelstats = await rakeoffAnalyticsCanister.get_canister_stats();
    return kernelstats;
  };

};

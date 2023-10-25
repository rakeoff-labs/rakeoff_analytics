import RakeoffStatisticsInterface "./RakeoffStatisticsInterface/statistics";
import RakeoffAchievementsInterface "./RakeoffAchievementsInterface/achievements";
import RakeoffKernelInterface "./RakeoffKernelInterface/kernel";
import IndexInterface "./IndexInterface/index";

actor RakeoffAnalytics {

  let RakeoffStatistics : RakeoffStatisticsInterface.Self = actor "jgvzt-eiaaa-aaaak-ae5kq-cai";

  let RakeoffKernel : RakeoffKernelInterface.Self = actor "rktkb-jiaaa-aaaap-aa23a-cai";

  // let IndexCanister : IndexInterface.Self = actor "qhbym-qaaaa-aaaaa-aaafq-cai";

  public type AnalyticsData = {
    total_icp_rewarded : Nat64;
    total_icp_stakers : Nat;
    total_icp_staked : Nat64;
    icp_earned_from_swap : Nat64;
    lotto_winners : [(Principal, Nat64)];
    icp_fees_collected : Nat64;
    price_per_ticket : Nat64;
    tickets_in_lotto : Nat;
    max_tickets_allowed : Nat;
    last_winner : (Principal, Nat64);
    total_ckbtc_exchanged : Nat;
    icp_earned_from_disbursement : Nat64;
    icp_in_lotto : Nat64;

  };

  public shared func get_rakeoff_analytics() : async AnalyticsData {
    let kernelstats = await RakeoffKernel.get_canister_stats();
    let statistics = await RakeoffStatistics.get_rakeoff_stats();
    return {
      total_icp_rewarded = statistics.total_icp_rewarded;
      total_icp_stakers = statistics.total_icp_stakers;
      total_icp_staked = statistics.total_icp_staked;
      icp_earned_from_swap = kernelstats.icp_earned_from_swap;
      lotto_winners = kernelstats.lotto_winners;
      icp_fees_collected = kernelstats.icp_fees_collected;
      price_per_ticket = kernelstats.price_per_ticket;
      tickets_in_lotto = kernelstats.tickets_in_lotto;
      max_tickets_allowed = kernelstats.max_tickets_allowed;
      last_winner = kernelstats.last_winner;
      total_ckbtc_exchanged = kernelstats.total_ckbtc_exchanged;
      icp_earned_from_disbursement = kernelstats.icp_earned_from_disbursement;
      icp_in_lotto = kernelstats.icp_in_lotto;
    };
  };

};

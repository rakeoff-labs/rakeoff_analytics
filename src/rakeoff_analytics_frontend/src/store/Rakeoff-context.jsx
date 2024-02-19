import React, { createContext, useState, useEffect } from "react";
import {
  getRakeoffStats,
  e8sToIcp,
  icpToDollars,
  GrabIcpPrice,
  getRakeoffTvl,
  getTotalCommits,
} from "../Components/tools";

export const RakeoffContext = createContext();

export const RakeoffProvider = ({ children }) => {
  const [rakeoffStats, setRakeoffStats] = useState({});
  const [loaded, setLoaded] = useState(false);
  // added error message
  const [error, setErrorMessage] = useState();

  // made usEffect this way starting from the top
  useEffect(() => {
    const fetchStats = async () => {
      // setloaded to false at begging
      setLoaded(false);
      try {
        const [icpPrice, tvlData, stats, totalCommits] = await Promise.all([
          GrabIcpPrice(),
          getRakeoffTvl(),
          getRakeoffStats(),
          getTotalCommits(),
        ]);

        setRakeoffStats({
          icp_price: icpPrice.toFixed(2),
          total_stakers: stats.total_stakers.toLocaleString(),
          total_staked_amount: Math.round(
            e8sToIcp(Number(stats.total_staked))
          ).toLocaleString(),
          highest_pool_win_amount: e8sToIcp(
            Number(stats.highest_win_amount)
          ).toFixed(2),
          highest_pool_amount: e8sToIcp(Number(stats.highest_pool)).toFixed(2),
          total_pool_winners: stats.total_winners_processed.toLocaleString(),
          claimed_from_achievements: Math.round(
            e8sToIcp(Number(stats.claimed_from_achievements))
          ).toFixed(2),
          total_claims_from_achievments: Math.round(
            Number(stats.total_neurons_in_achievements)
          ).toLocaleString(),
          total_rewards: icpToDollars(icpPrice, Number(stats.total_rewarded)),
          total_fees: e8sToIcp(Number(stats.fees_collected)).toFixed(2),
          fees_from_disbursement: e8sToIcp(
            stats.fees_from_disbursement
          ).toFixed(2),
          fees_from_prize_pool: e8sToIcp(
            Number(stats.fees_collected) - Number(stats.fees_from_disbursement)
          ).toFixed(2),
          average_stake_amount: Math.round(
            Math.round(e8sToIcp(Number(stats.total_staked))) /
              Number(stats.total_stakers)
          ), // custom calculation
          average_pool_win: e8sToIcp(stats.average_win_amount).toFixed(2),
          average_icp_per_pool: e8sToIcp(stats.average_per_pool).toFixed(2),
          total_successful_pools: stats.total_pools_successfully_completed,
          total_transaction_failures: stats.total_winner_processing_failures,
          pool_history: stats.pool_history_chart_data,
          tvl_history: tvlData,
          totalCommits,
        });
        // once all loaded set true
        setLoaded(true);
      } catch (error) {
        // error handling with error message, render Error component in App
        setErrorMessage({
          message: error.message || "Unable to fetch API data",
        });
        // setting loaded to true to render Error component if Rakeoff API breaks
        setLoaded(true);
      }
    };

    fetchStats();
  }, []);

  return (
    <RakeoffContext.Provider value={{ rakeoffStats, loaded, error }}>
      {children}
    </RakeoffContext.Provider>
  );
};

export default RakeoffContext;

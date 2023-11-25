import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { MixofCs, Footer, BottomStat } from "./Components";
import {
  getRakeoffStats,
  e8sToIcp,
  icpToDollars,
  GrabIcpPrice,
  getRakeoffTvl,
  getRakeoffCommitHistory,
} from "./Components/tools";

const App = () => {
  const [rakeoffStats, setRakeoffStats] = useState({}); // empty object
  const [loaded, setLoaded] = useState(false);

  const fetchStats = async () => {
    // do all the stat work here
    const [icpPrice, commitData, tvlData, stats] = await Promise.all([
      GrabIcpPrice(),
      getRakeoffCommitHistory(),
      getRakeoffTvl(),
      getRakeoffStats(),
    ]);

    // set the stats
    setRakeoffStats({
      price: icpPrice.toFixed(2),
      icpStakers: stats.total_stakers.toLocaleString(),
      stakedAmount: Math.round(
        e8sToIcp(Number(stats.total_staked))
      ).toLocaleString(),
      highestWinner: e8sToIcp(Number(stats.highest_win_amount)).toFixed(2), // synchronous calculations
      highestPool: e8sToIcp(Number(stats.highest_pool)).toFixed(2),
      totalWinners: stats.total_winners_processed.toLocaleString(),
      claimedICP: Math.round(
        e8sToIcp(Number(stats.claimed_from_achievements))
      ).toFixed(2),
      totalClaim: Math.round(
        Number(stats.total_neurons_in_achievements)
      ).toLocaleString(),
      getrewards: icpToDollars(icpPrice, Number(stats.total_rewarded)),
      icpFees: icpToDollars(icpPrice, Number(stats.fees_collected)),
      icp_fees_from_disbursement: e8sToIcp(
        stats.fees_from_disbursement
      ).toFixed(2),
      average_stake: (
        Math.round(e8sToIcp(Number(stats.total_staked))) /
        Number(stats.total_stakers)
      ).toFixed(2), // custom calculation
      average_pool_win: e8sToIcp(stats.average_win_amount).toFixed(2),
      average_icp_per_pool: e8sToIcp(stats.average_per_pool).toFixed(2),
      total_successful_pools: stats.total_pools_successfully_completed,
      total_transaction_failures: stats.total_winner_processing_failures,
      pool_history: stats.pool_history_chart_data,
      commit_history: commitData,
      tvl_history: tvlData,
    });

    // everything is loaded
    setLoaded(true);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // TODO cleanup these props (just rakeoff stats needed)
  // TODO add loading symbol or skeletion
  return (
    <Box>
      {loaded ? (
        <>
          <MixofCs
            icpStakers={rakeoffStats.icpStakers}
            stakedAmount={rakeoffStats.stakedAmount}
            icpFees={rakeoffStats.icpFees}
            grabICP={rakeoffStats.price}
            tvlChartData={rakeoffStats.tvl_history}
            commitsChartData={rakeoffStats.commit_history}
            poolHistoryChartData={rakeoffStats.pool_history}
          />
          <BottomStat
            highestPool={rakeoffStats.highestPool}
            highestWinner={rakeoffStats.highestWinner}
            totalWinners={rakeoffStats.totalWinners}
            claimedICP={rakeoffStats.claimedICP}
            totalClaim={rakeoffStats.totalClaim}
            getrewards={rakeoffStats.getrewards}
            averageStake={rakeoffStats.average_stake}
            averagePerPool={rakeoffStats.average_icp_per_pool}
            averagePoolWin={rakeoffStats.average_pool_win}
            totalSuccessfulPools={rakeoffStats.total_successful_pools}
            totalTransactionFailures={rakeoffStats.total_transaction_failures}
            icpFeesFromDisbursement={rakeoffStats.icp_fees_from_disbursement}
          />
        </>
      ) : (
        "Loading.."
      )}
      <Footer />
    </Box>
  );
};

export default App;

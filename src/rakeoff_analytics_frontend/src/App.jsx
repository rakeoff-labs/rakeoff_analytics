import React, { useState, useEffect } from "react";
import { Box, Flex, Image as ChakraImage, keyframes } from "@chakra-ui/react";
import { MixofCs, Footer, BottomStat } from "./Components";
import {
  getRakeoffStats,
  e8sToIcp,
  icpToDollars,
  GrabIcpPrice,
  getRakeoffTvl,
  getRakeoffCommitHistory,
  getLandingCommits,
  apiOBject,
} from "./Components/tools";
import rakeoffLogo from "../assets/rakeoff_logo_white.svg";

const fadeInOut = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }  // Adjust the scale value for more or less "zoom"
  100% { transform: scale(1); }
`;

const App = () => {
  const [rakeoffStats, setRakeoffStats] = useState({}); // empty object
  const [loaded, setLoaded] = useState(false);

  const fetchStats = async () => {
    // do all the stat work here
    const [icpPrice, commitData, tvlData, stats, totalCommits, objects] =
      await Promise.all([
        GrabIcpPrice(),
        getRakeoffCommitHistory(),

        getRakeoffTvl(),
        getRakeoffStats(),
        getLandingCommits(),
        apiOBject,
      ]);

    // set the stats
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
      fees_from_disbursement: e8sToIcp(stats.fees_from_disbursement).toFixed(2),
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
      commit_history: commitData,
      tvl_history: tvlData,
      totalCommits,
      objects,
    });

    // everything is loaded
    setLoaded(true);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <Box>
      {loaded ? (
        <>
          <MixofCs {...rakeoffStats} />
          <BottomStat {...rakeoffStats} />
          <Footer />
        </>
      ) : (
        <Flex h="100vh" align="center" justify="center">
          <ChakraImage
            src={rakeoffLogo}
            h={"80px"}
            animation={`${fadeInOut} 0.8s ease-in-out infinite`}
          />
        </Flex>
      )}
    </Box>
  );
};

export default App;

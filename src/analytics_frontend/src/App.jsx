import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { MixofCs, Footer, BottomStat } from "./Components";
import {
  getRakeoffStats,
  e8sToIcp,
  icpToDollars,
  GrabIcpPrice,
} from "./Components/tools";

const App = () => {
  // in order to use the await to grab the function to fetch dollar prices
  const [rakeoffStats, setRakeoffStats] = useState({
    icpStakers: 0,
    stakedAmount: 0,
    icpFees: 0,
    highestWinner: 0,
    highestPool: 0,
    totalWinners: 0,
    claimedICP: 0,
    totalClaim: 0,
    grabICP: 0,
    getrewards: 0,
  });
  const [grabICP, setGrabIcp] = useState(0);

  const fetchStats = async () => {
    const stats = await getRakeoffStats();
    return stats;
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const stat = await fetchStats();
        const icpPrice = await GrabIcpPrice();
        setGrabIcp(icpPrice);
        setRakeoffStats({
          icpStakers: stat.total_stakers,
          stakedAmount: Math.round(
            e8sToIcp(Number(stat.total_staked))
          ).toLocaleString(),
          highestWinner: await icpToDollars(Number(stat.highest_win_amount)),
          highestPool: await icpToDollars(Number(stat.highest_pool)),
          totalWinners: stat.total_winners_processed,
          claimedICP: Math.round(
            e8sToIcp(Number(stat.claimed_from_achievements))
          ).toLocaleString(),
          totalClaim: Math.round(
            Number(stat.total_neurons_in_achievements)
          ).toLocaleString(),
          getrewards: await icpToDollars(Number(stat.total_rewarded)),
          icpFees: await icpToDollars(Number(stat.fees_collected)),
        });
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchAllData();
  }, []);

  return (
    <Box>
      <MixofCs
        icpStakers={rakeoffStats.icpStakers}
        stakedAmount={rakeoffStats.stakedAmount}
        icpFees={rakeoffStats.icpFees}
        grabICP={grabICP}
      />
      <BottomStat
        higestPool={rakeoffStats.highestPool}
        highestWinner={rakeoffStats.highestWinner}
        totalWinners={rakeoffStats.totalWinners}
        claimedICP={rakeoffStats.claimedICP}
        totalClaim={rakeoffStats.totalClaim}
        getrewards={rakeoffStats.getrewards}
      />
      <Footer />
    </Box>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { MixofCs, Footer, BottomStat } from "./Components";
import { getRakeoffStats, e8sToIcp, icpToDollars } from "./Components/tools";

const App = () => {
  const [icpStakers, setIcpStakers] = useState(0);
  const [stakedAmount, setStakedAmount] = useState(0);
  const [icpFees, setIcpFees] = useState(0);
  const [highestWinner, setHighestWinner] = useState(0);
  const [higestPool, setHighestPool] = useState(0);
  const [totalWinners, setTotalWinners] = useState(0);
  const [claimedICP, setClaimedICP] = useState(0);
  const [totalClaim, setTotalClaims] = useState(0);
  const [grabICP, setGrabIcp] = useState(0);

  const fetchStats = async () => {
    const stats = await getRakeoffStats();
    return stats;
  };
  const GrabIcpPrice = async () => {
    fetch(
      "https://api.pro.coinbase.com/products/ICP-USD/candles?granularity=900"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("API not working");
        }
        return response.json();
      })
      .then((data) => {
        const price = data[0][4];

        setGrabIcp(price);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
      });
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const stat = await fetchStats();
        const getPrice = await GrabIcpPrice();
        setIcpStakers(stat.total_stakers);
        setStakedAmount(
          Math.round(e8sToIcp(Number(stat.total_staked))).toLocaleString()
        );
        setHighestWinner(await icpToDollars(Number(stat.highest_win_amount)));
        setHighestPool(await icpToDollars(Number(stat.highest_pool)));
        setTotalWinners(stat.total_winners_processed);
        setClaimedICP(
          Math.round(
            e8sToIcp(Number(stat.claimed_from_achievements))
          ).toLocaleString()
        );
        setTotalClaims(
          Math.round(
            Number(stat.total_neurons_in_achievements)
          ).toLocaleString()
        );
        setIcpFees(await icpToDollars(Number(stat.fees_collected)));
        setGrabIcp(getPrice.price);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchAllData();
  }, []);

  return (
    <Box>
      <MixofCs
        icpStakers={icpStakers}
        stakedAmount={stakedAmount}
        icpFees={icpFees}
        grabICP={grabICP}
      />
      <BottomStat
        higestPool={higestPool}
        highestWinner={highestWinner}
        totalWinners={totalWinners}
        claimedICP={claimedICP}
        totalClaim={totalClaim}
      />
      <Footer />
    </Box>
  );
};

export default App;

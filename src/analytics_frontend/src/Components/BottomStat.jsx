import React, { useState, useEffect } from "react";
import { Container, SimpleGrid, useBreakpointValue } from "@chakra-ui/react";
import { getRakeoffStats, icpToDollars } from "./tools";
import { StoryBoxAndImage } from "./TopStat";

const BottomStat = () => {
  // RAKEOFF API //////
  /////////////////

  const [highestWinner, setHighestWinner] = useState(0);
  const [higestPool, setHighestPool] = useState(0);
  const [totalWinners, setTotalWinners] = useState(0);
  const [avgWinner, setAverageWinner] = useState(0);
  const [icpFees, setIcpFees] = useState(0);
  const [failedpools, setFailedPools] = useState(0);

  const fetchPrizeStat = async () => {
    const getStat = await getRakeoffStats();

    setHighestWinner(await icpToDollars(Number(getStat.highest_win_amount)));
    setHighestPool(await icpToDollars(Number(getStat.highest_pool)));
    setTotalWinners(getStat.total_winners_processed);
    setFailedPools(await getStat.total_winner_processing_failures);
    setAverageWinner(await icpToDollars(getStat.average_win_amount));
    setIcpFees(await icpToDollars(Number(getStat.fees_collected)));
  };

  useEffect(() => {
    fetchPrizeStat();
  });

  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <Container maxW="7xl" mt={{ base: 3, md: 1 }} p={0}>
      <SimpleGrid
        gap={3}
        columns={[2, 1, 4]}
        spacing={{ base: 3, md: 4 }}
        mx={{ base: 3, md: 3, lg: 0 }}
      >
        <StoryBoxAndImage
          isDesktop={isDesktop}
          heading={highestWinner}
          info="Highest winner"
        />
        <StoryBoxAndImage
          isDesktop={isDesktop}
          heading={higestPool}
          info="Highest pool"
        />
        <StoryBoxAndImage
          isDesktop={isDesktop}
          heading={totalWinners}
          info="Total winners"
        />
        <StoryBoxAndImage
          isDesktop={isDesktop}
          heading={avgWinner}
          info="Average winning"
        />
      </SimpleGrid>
      <SimpleGrid
        gap={3}
        columns={[2, 1, 2]}
        spacing={{ base: 3, md: 4 }}
        mx={{ base: 3, md: 3, lg: 0 }}
      >
        <StoryBoxAndImage
          isDesktop={isDesktop}
          heading={failedpools}
          info="Failed pools"
        />
        <StoryBoxAndImage
          heading={icpFees}
          isDesktop={isDesktop}
          info="Fees collected"
        />
      </SimpleGrid>
    </Container>
  );
};

export default BottomStat;

import React, { useState, useEffect } from "react";
import { Container, SimpleGrid } from "@chakra-ui/react";
import { getRakeoffStats, icpToDollars } from "./tools";
import { StoryBoxAndImage } from "./TopStat";

const BottomStat = () => {
  const [highestWinner, setHighestWinner] = useState(0);
  const [higestPool, setHighestPool] = useState(0);
  const [totalWinners, setTotalWinners] = useState(0);
  const [avgWinner, setAverageWinner] = useState(0);
  const [icpFees, setIcpFees] = useState(0);
  const [feesDisburse, setFeesDisburse] = useState(0);

  const fetchPrizeStat = async () => {
    const getStat = await getRakeoffStats();

    setHighestWinner(await icpToDollars(Number(getStat.highest_win_amount)));
    setHighestPool(await icpToDollars(Number(getStat.highest_pool)));
    setTotalWinners(getStat.total_winners_processed);
    setFeesDisburse(await icpToDollars(Number(getStat.fees_from_disbursement)));
    setAverageWinner(await icpToDollars(getStat.average_win_amount));
    setIcpFees(await icpToDollars(Number(getStat.fees_collected)));
  };

  useEffect(() => {
    fetchPrizeStat();
  });

  return (
    <Container maxW="7xl" mt={{ base: 3, md: 1 }} p={0}>
      <SimpleGrid
        gap={3}
        columns={[2, 1, 4]}
        spacing={{ base: 3, md: 4 }}
        mx={{ base: 3, md: 3, lg: 0 }}
      >
        <StoryBoxAndImage heading={highestWinner} info="Highest winner" />
        <StoryBoxAndImage heading={higestPool} info="Highest pool" />
        <StoryBoxAndImage heading={totalWinners} info="Total winners" />
        <StoryBoxAndImage heading={avgWinner} info="Average winning" />
      </SimpleGrid>
      <SimpleGrid
        gap={3}
        columns={[2, 1, 2]}
        spacing={{ base: 3, md: 4 }}
        mx={{ base: 3, md: 3, lg: 0 }}
      >
        <StoryBoxAndImage
          heading={feesDisburse}
          info="Fees from disbursements"
        />
        <StoryBoxAndImage heading={icpFees} info="Fees collected" />
      </SimpleGrid>
    </Container>
  );
};

export default BottomStat;

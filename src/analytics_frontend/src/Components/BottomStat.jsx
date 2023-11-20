import React, { useState, useEffect } from "react";
import {
  Container,
  SimpleGrid,
  useBreakpointValue,
  Box,
  Heading,
} from "@chakra-ui/react";
import { getRakeoffStats, icpToDollars, e8sToIcp } from "./tools";
import { boxBackgroundColor, boxBorderColor } from "./colors";

const BottomStat = () => {
  // RAKEOFF API //////
  /////////////////

  const [highestWinner, setHighestWinner] = useState(0);
  const [higestPool, setHighestPool] = useState(0);
  const [totalWinners, setTotalWinners] = useState(0);
  const [avgWinner, setAverageWinner] = useState(0);
  const [claimedICP, setClaimedICP] = useState(0);
  const [totalClaims, setTotalClaims] = useState(0);

  const fetchPrizeStat = async () => {
    const getStat = await getRakeoffStats();

    setHighestWinner(await icpToDollars(Number(getStat.highest_win_amount)));
    setHighestPool(await icpToDollars(Number(getStat.highest_pool)));
    setTotalWinners(getStat.total_winners_processed);

    setAverageWinner(await icpToDollars(getStat.average_win_amount));
    setClaimedICP(
      Math.round(
        e8sToIcp(Number(getStat.claimed_from_achievements))
      ).toLocaleString()
    );
    setTotalClaims(
      Math.round(Number(getStat.total_neurons_in_achievements)).toLocaleString()
    );
  };

  useEffect(() => {
    fetchPrizeStat();
  });

  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <Container maxW="7xl" mt={{ base: 3, md: 1 }} p={0}>
      <Heading
        align="start"
        size={{ base: "md", md: "lg" }}
        m={{ base: 6, md: 3 }}
        color="white"
      >
        ICP Pools
      </Heading>
      <SimpleGrid
        gap={3}
        columns={[1, 1, 3]}
        spacing={{ base: 3, md: 4 }}
        mx={{ base: 3, md: 3, lg: 0 }}
      >
        <StoryBoxAndImage
          isDesktop={isDesktop}
          heading={highestWinner}
          info="Highest prize won"
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
      </SimpleGrid>
      <Heading
        align="start"
        size={{ base: "md", md: "lg" }}
        m={{ base: 6, md: 3 }}
        color="white"
      >
        ICP Bonuses
      </Heading>

      <SimpleGrid
        gap={3}
        columns={[2, 1, 2]}
        spacing={{ base: 3, md: 4 }}
        mx={{ base: 3, md: 3, lg: 0 }}
      >
        <StoryBoxAndImage
          heading={claimedICP}
          isDesktop={isDesktop}
          info=" ICP bonuses claimed"
        />
        <StoryBoxAndImage
          isDesktop={isDesktop}
          heading={totalClaims}
          info="Total claims"
        />
      </SimpleGrid>
    </Container>
  );
};

export default BottomStat;
const StoryBoxAndImage = ({ isDesktop, heading, info }) => {
  return (
    <Box
      bg={boxBackgroundColor}
      border={boxBorderColor}
      borderRadius="2xl"
      py={18}
      align="center"
      m={2}
      p={6}
      w="100%"
    >
      <Heading
        size={isDesktop ? "lg" : "md"}
        textAlign="center"
        m={3}
        mb={3}
        color="white"
      >
        {heading}
      </Heading>

      <Heading size={isDesktop ? "md" : "md"} color="gray.300">
        {info}
      </Heading>
    </Box>
  );
};

import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Container,
  Stat,
  StatNumber,
  useBreakpointValue,
} from "@chakra-ui/react";
import { boxBackgroundColor, boxBorderColor } from "./colors";

import { getRakeoffStats, icpToDollars, e8sToIcp } from "./tools";

const Topstat = () => {
  // RAKEOFF API //////
  /////////////////

  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const [icpStakers, setIcpStakers] = useState(0);

  const [claimedAchiev, setClaimedAchiev] = useState(0);
  const [totalRewarded, setTotalRewarded] = useState(0);
  const [stakedAmount, setStakedAmount] = useState(0);

  const fetchStats = async () => {
    const stat = await getRakeoffStats();

    setIcpStakers(stat.total_stakers);
    setStakedAmount(
      Math.round(e8sToIcp(Number(stat.total_staked))).toLocaleString()
    );

    setClaimedAchiev(Math.round(e8sToIcp(stat.claimed_from_achievements)));
    setTotalRewarded(Math.round(e8sToIcp(stat.total_rewarded)));
  };

  useEffect(() => {
    fetchStats();
  });

  return (
    <Container maxW="7xl" mt={{ base: 3, md: 1 }} p={0}>
      <SimpleGrid
        gap={3}
        columns={[2, 2, 4]}
        spacing={{ base: 3, md: 8 }}
        mx={{ base: 3, md: 3, lg: 0 }}
      >
        <StoryBoxAndImage
          isDesktop={isDesktop}
          heading={icpStakers}
          info="Total stakers"
        />
        <StoryBoxAndImage
          isDesktop={isDesktop}
          heading={stakedAmount}
          info="Staked amount"
        />

        <StoryBoxAndImage
          isDesktop={isDesktop}
          heading={totalRewarded}
          info="ICP rewarded"
        />
        <StoryBoxAndImage
          isDesktop={isDesktop}
          heading={claimedAchiev}
          info="Claimed ICP bonus"
        />
      </SimpleGrid>
    </Container>
  );
};
export default Topstat;

export const StoryBoxAndImage = ({ isDesktop, heading, info }) => {
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
        size={isDesktop ? "lg" : "sm"}
        textAlign="center"
        m={3}
        mb={3}
        color="white"
      >
        {heading}
      </Heading>

      <Heading size={isDesktop ? "md" : "sm"}> {info}</Heading>
    </Box>
  );
};

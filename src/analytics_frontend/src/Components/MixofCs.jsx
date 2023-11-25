import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import Graph from "./Graph";
import { RakeoffGrey, boxBackgroundColor } from "./colors";

const MixofCs = ({
  icpStakers,
  stakedAmount,
  icpFees,
  grabICP,
  tvlChartData,
  commitsChartData,
  poolHistoryChartData,
}) => {
  return (
    <Box position="relative">
      <Navbar />
      <Banner
        icpStakers={icpStakers}
        stakedAmount={stakedAmount}
        icpFees={icpFees}
        grabICP={grabICP}
      />
      <Graph
        tvlChartData={tvlChartData}
        commitsChartData={commitsChartData}
        poolHistoryChartData={poolHistoryChartData}
      />
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        h="50%"
        bgGradient={`linear(to-bl, ${boxBackgroundColor}, purple.500, #6229a8)`}
        zIndex="-1"
      />
    </Box>
  );
};

export default MixofCs;

const Banner = ({ icpStakers, stakedAmount, icpFees, grabICP }) => {
  return (
    <Container
      maxW="7xl"
      mt={{ base: 6, md: "5rem" }}
      bgGradient="linear(to-b, purple.800, white.300)"
    >
      <Box mt={{ base: 6, md: 0 }}>
        <Flex align="center" gap={3}>
          <Flex align="center">
            <Heading color={"white"} size={{ base: "2xl", md: "3xl" }}>
              RAKE
            </Heading>
            <Heading color={RakeoffGrey} size={{ base: "2xl", md: "3xl" }}>
              OFF
            </Heading>
          </Flex>
          <Heading color="white" size={{ base: "2xl", md: "3xl" }}>
            Analytics
          </Heading>
        </Flex>
      </Box>

      <SimpleGrid
        columns={[2, 4, 4]}
        gap={1}
        w={{ base: "90%", md: "50%" }}
        my={6}
      >
        <StatItem title={"ICP price"} stat={`$${grabICP}`} />
        <StatItem title={"Total Stakers"} stat={icpStakers} />
        <StatItem title={"ICP staked"} stat={stakedAmount} />
        <StatItem title={"Fees collected"} stat={icpFees} />
      </SimpleGrid>
    </Container>
  );
};

const StatItem = ({ title, stat }) => {
  return (
    <Flex justify="start" align="center" gap={1}>
      <Text color="white" noOfLines={1}>{title}:</Text>
      <Text fontWeight={500} color="white">
        {stat}
      </Text>
    </Flex>
  );
};

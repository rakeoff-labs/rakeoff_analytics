import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  SimpleGrid,
  Stack,
  useBreakpointValue,
  HStack,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import Graph from "./Graph";
import { RakeoffGrey, boxBackgroundColor } from "./colors";

const MixofCs = ({
  icpStakers,
  stakedAmount,
  icpFees,
  grabICP,
  totalCommits,
  chartData,
}) => {
  return (
    <Box position="relative">
      <Box>
        <Navbar />
        <Banner
          icpStakers={icpStakers}
          stakedAmount={stakedAmount}
          icpFees={icpFees}
          grabICP={grabICP}
        />
      </Box>
      <Graph totalCommits={totalCommits} chartData={chartData} />
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
      p={0}
    >
      <Stack
        h={"100%"}
        align={{ base: "start", md: "start" }}
        direction={{ base: "column", md: "row" }}
      >
        <Box
          mb={{ base: 0, md: 4 }}
          ml={{ base: 4, md: 3 }}
          mt={{ base: 6, md: 0 }}
        >
          <Flex align="center" gap={3}>
            <Flex align="center">
              <Heading color={"white"} size={{ base: "xl", md: "3xl" }}>
                RAKE
              </Heading>
              <Heading color={RakeoffGrey} size={{ base: "xl", md: "3xl" }}>
                OFF
              </Heading>
            </Flex>
            <Heading color="white" size={{ base: "xl", md: "3xl" }}>
              Analytics
            </Heading>
          </Flex>
        </Box>
      </Stack>

      <Marketbox
        icpStakers={icpStakers}
        stakedAmount={stakedAmount}
        icpFees={icpFees}
        grabICP={grabICP}
      />
    </Container>
  );
};

const Marketbox = ({ grabICP, icpStakers, stakedAmount, icpFees }) => {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return isDesktop ? (
    <HStack spacing={8} mb={6} ml={3} mt={3}>
      <Text>ICP price: ${grabICP.toFixed(2)}</Text>
      <Text>Total Stakers: {icpStakers}</Text>
      <Text>ICP Staked: {stakedAmount}</Text>
      <Text>Fees collected: {icpFees}</Text>
    </HStack>
  ) : (
    <SimpleGrid columns={2} ml={4} mb={6} spacing={2} mt={3}>
      <Text>ICP price: ${grabICP}</Text>
      <Text>Total Stakers: {icpStakers}</Text>
      <Text>ICP Staked: {stakedAmount}</Text>
      <Text>Fees collected: {icpFees}</Text>
    </SimpleGrid>
  );
};

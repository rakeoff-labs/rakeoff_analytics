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

export const boxBackgroundColor = "#292e40";
const MixofCs = ({ icpStakers, stakedAmount, icpFees, grabICP }) => {
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
      <Graph />
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
      mt={{ base: 12, md: "5rem" }}
      bgGradient="linear(to-b, purple.800, white.300)"
      p={0}
    >
      <Box align="start" m={{ base: 3, md: 3 }}>
        <Heading
          textAlign={{ base: "center", lg: "start" }}
          size={{ base: "lg", lg: "2xl" }}
          ml={{ base: 4, md: 0 }}
          mb={8}
        >
          RAKEOFF Analytics
        </Heading>
      </Box>
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
  return (
    <SimpleGrid
      columns={1}
      gap={2}
      spacing={{ base: 3, md: 1 }}
      m={{ base: 8, md: 4 }}
    >
      <Box>
        <Flex
          direction={{ base: "column", lg: "row" }}
          wrap="wrap"
          textAlign="center"
        >
          <Text
            color="white"
            ml={{ base: "8", lg: "0" }}
            mr={{ base: "0", lg: "8" }}
          >
            ICP price: ${grabICP.toFixed(2)}
          </Text>
          <Text
            color="white"
            ml={{ base: "8", lg: "0" }}
            mr={{ base: "0", lg: "8" }}
          >
            Total Stakers: {icpStakers}
          </Text>
          <Text
            color="white"
            ml={{ base: "8", lg: "0" }}
            mr={{ base: "0", lg: "8" }}
          >
            Staked Amount: {stakedAmount}
          </Text>
          <Text
            color="white"
            ml={{ base: "8", lg: "0" }}
            mr={{ base: "0", lg: "8" }}
          >
            Fees collected: {icpFees}
          </Text>
        </Flex>
      </Box>
    </SimpleGrid>
  );
};

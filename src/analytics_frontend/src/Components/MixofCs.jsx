import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Stat,
  StatHelpText,
  Flex,
  StatArrow,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import Graph from "./Graph";
import Topstat from "./TopStat";

export const boxBackgroundColor = "#292e40";
const MixofCs = () => {
  return (
    <Box position="relative">
      <Box
        bgGradient={`linear(to-bl, ${boxBackgroundColor}, purple.500, #6229a8)`}
      >
        <Navbar />
        <Banner />
        <Topstat />
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
const Banner = () => {
  return (
    <Container
      maxW="7xl"
      mt={{ base: 12, md: "5rem" }}
      bgGradient="linear(to-b, purple.800, white.300)"
      p={0}
    >
      <Box align="start" m={{ base: 6, md: 3 }}>
        <Heading size="2xl" mb={8}>
          Rakeoff Analytics
        </Heading>
      </Box>
      <Marketbox />
    </Container>
  );
};

const Marketbox = () => {
  const [grabICP, setGrabIcp] = useState(0);
  const [twentyfour, setTwentyfour] = useState(0);

  useEffect(() => {
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
        const priceChange = data[96][4];
        const differenceInChange = ((price - priceChange) / priceChange) * 100;
        setGrabIcp(price);
        setTwentyfour(differenceInChange);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
      });
  }, []);

  const showchangeColour = setTwentyfour > 0 ? "#38A169" : "#E53E3E";
  const arrowtype = setTwentyfour > 0 ? "increase" : "decrease";
  return (
    <>
      <Flex mb={8} m={{ base: 4, md: 3 }}>
        <Text color="gray.300" mr={1.5}>
          ICP:
        </Text>
        <Text size={{ base: "sm", lg: "lg" }} color="white" mr={1.5}>
          ${grabICP.toFixed(2)}
        </Text>

        <Stat>
          <StatHelpText mt={0.5} color={showchangeColour}>
            <StatArrow type={arrowtype} mr={1} />
            {twentyfour.toFixed(2)}%
          </StatHelpText>
        </Stat>
      </Flex>
    </>
  );
};

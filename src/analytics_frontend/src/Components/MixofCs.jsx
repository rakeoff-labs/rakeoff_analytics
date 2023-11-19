import React, { useState, useEffect, Children } from "react";
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
import Topstat from "./TopStat";

import { getRakeoffStats, e8sToIcp, icpToDollars } from "./tools";

export const boxBackgroundColor = "#292e40";
const MixofCs = () => {
  return (
    <Box position="relative">
      <Box>
        <Navbar />
        <Banner />
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
const Banner = ({ grabICP, icpStakers }) => {
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
  const [icpStakers, setIcpStakers] = useState(0);
  const [stakedAmount, setStakedAmount] = useState(0);
  const [icpFees, setIcpFees] = useState(0);

  const fetchStats = async () => {
    const stat = await getRakeoffStats();

    setIcpStakers(stat.total_stakers);
    setStakedAmount(
      Math.round(e8sToIcp(Number(stat.total_staked))).toLocaleString()
    );
    setIcpFees(await icpToDollars(Number(stat.fees_collected)));
  };

  useEffect(() => {
    fetchStats();
  });

  const [grabICP, setGrabIcp] = useState(0);

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

        setGrabIcp(price);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
      });
  }, []);

  return (
    <SimpleGrid columns={[2, 1, 4]} spacing={{ base: 3, md: 1 }}>
      <Box ml={8}>
        <Text color="gray.300">ICP price: {grabICP}</Text>
      </Box>
      <Box ml={8}>
        <Text color="gray.300">Total Stakers: {icpStakers}</Text>
      </Box>
      <Box ml={8}>
        <Text color="gray.300">Staked Amount: {stakedAmount}</Text>
      </Box>
      <Box ml={8}>
        <Text color="gray.300">Fees collected: {icpFees}</Text>
      </Box>
    </SimpleGrid>
  );
};

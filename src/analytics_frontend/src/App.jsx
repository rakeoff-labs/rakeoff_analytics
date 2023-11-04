import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import {
  Sidebar,
  Banner,
  MarketPrices,
  Footer,
  Stat,
  Graph,
  Medium,
  Boxstat,
} from "./Components";

const App = () => {
  return (
    <Flex>
      <Sidebar />
      <Box ml="5">
        <Banner />
        <Stat />
        <Graph />
        <Boxstat />
        <Medium />
        <Footer />
      </Box>
    </Flex>
  );
};

export default App;

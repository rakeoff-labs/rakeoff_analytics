import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import {
  Dashboard,
  Sidebar,
  Transactions,
  Searchbar,
  Graph,
  Banner,
  MarketPrices,
} from "./Components";

const App = () => {
  return (
    <Flex>
      <Sidebar />
      <Box ml="5">
        <Banner />
        <Searchbar />
        <MarketPrices />
        <Graph />
        <Dashboard />
        <Transactions />
      </Box>
    </Flex>
  );
};

export default App;

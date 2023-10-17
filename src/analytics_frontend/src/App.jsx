import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import {
  Dashboard,
  Sidebar,
  Transactions,
  Searchbar,
  // Graph,
  Banner,
  MarketPrices,
  Footer,
  Overview,
} from "./Components";

const App = () => {
  return (
    <Flex>
      <Sidebar />
      <Box ml="5">
        <Banner />
        <Searchbar />
        <MarketPrices />
        <Overview />
        {/* <Graph /> */}
        <Dashboard />
        <Transactions />
        <Footer />
      </Box>
    </Flex>
  );
};

export default App;

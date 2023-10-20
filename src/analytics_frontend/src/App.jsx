import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import {
  Sidebar,
  Searchbar,
  // Graph,
  Banner,
  MarketPrices,
  Footer,
  Stat,
} from "./Components";

const App = () => {
  return (
    <Flex>
      <Sidebar />
      <Box ml="5">
        <Banner />
        <Searchbar />
        <MarketPrices />
        <Stat />
        {/* <Graph /> */}

        <Footer />
      </Box>
    </Flex>
  );
};

export default App;

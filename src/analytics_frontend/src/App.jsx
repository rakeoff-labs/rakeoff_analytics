import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import {
  Sidebar,
  Searchbar,
  Banner,
  MarketPrices,
  Footer,
  Stat,
  Graph,
  Article,
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
        <Graph />
        <Article />
        <Footer />
      </Box>
    </Flex>
  );
};

export default App;

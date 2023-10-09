import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Dashboard, Sidebar, Transactions, Graph } from "./Components";

const App = () => {
  return (
    <Box>
      <Graph />
      <Dashboard />
      <Transactions />
    </Box>
    // </Flex>
  );
};

export default App;

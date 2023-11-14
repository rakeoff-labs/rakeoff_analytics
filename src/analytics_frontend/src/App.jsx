import React from "react";
import { Box } from "@chakra-ui/react";
import {
  Banner,
  Footer,
  Topstat,
  Graph,
  Navbar,
  BottomStat,
} from "./Components";

const App = () => {
  return (
    <Box>
      <Navbar />
      <Banner />
      <Topstat />
      <Graph />
      <BottomStat />
      <Footer />
    </Box>
  );
};

export default App;

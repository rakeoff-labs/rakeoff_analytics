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
export const mainBackgroundColor = "#1b2030";

export const boxBackgroundColor = "#292e40";

const App = () => {
  return (
    <>
      <Box
        bgGradient={`linear(to-bl, ${boxBackgroundColor}, purple.500, #6229a8)`}
      >
        <Navbar />
        <Banner />
        <Topstat />
      </Box>
      <Box bg={mainBackgroundColor}>
        <Graph />
        <BottomStat />
        <Footer />
      </Box>
    </>
  );
};

export default App;

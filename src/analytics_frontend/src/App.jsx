import React from "react";
import { Box } from "@chakra-ui/react";
import { MixofCs, Footer, BottomStat } from "./Components";
export const mainBackgroundColor = "#1b2030";

export const boxBackgroundColor = "#292e40";

const App = () => {
  return (
    <Box>
      <MixofCs />
      <BottomStat />
      <Footer />
    </Box>
  );
};

export default App;

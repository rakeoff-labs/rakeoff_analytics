import React, { useContext } from "react";
import { Box, Flex, Image as ChakraImage, keyframes } from "@chakra-ui/react";
import { BannerComponents, Footer, BottomStat, Error } from "./Components";

import rakeoffLogo from "../assets/rakeoff_logo_white.svg";
import { RakeoffContext } from "./store/Rakeoff-context";

const fadeInOut = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }  // Adjust the scale value for more or less "zoom"
  100% { transform: scale(1); }
`;
const App = () => {
  const { loaded, error } = useContext(RakeoffContext);

  return (
    <Box>
      {loaded ? (
        <>
          {!error ? (
            <>
              <BannerComponents />
              <BottomStat />
              <Footer />
            </>
          ) : (
            // for Rakeoff API
            <Error />
          )}
        </>
      ) : (
        <Flex h="100vh" align="center" justify="center">
          <ChakraImage
            src={rakeoffLogo}
            h={"80px"}
            animation={`${fadeInOut} 0.8s ease-in-out infinite`}
          />
        </Flex>
      )}
    </Box>
  );
};

export default App;

import React from "react";
import { Box, Flex, Heading, Text, Image } from "@chakra-ui/react";
import rakeoffLogo from "../../assets/rakeoff_logo_white.svg";

export default function Error() {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      h="90vh"
      textAlign="center"
    >
      <Image src={rakeoffLogo} h={"80px"} mb="2" />
      <Heading size="3xl" color={"purple.400"} mb="2">
        Error 503
      </Heading>
      <Heading size="lg">Rakeoff server is currently unavailable</Heading>
    </Flex>
  );
}

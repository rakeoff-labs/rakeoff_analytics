import React from "react";
import { Box, Container, Heading } from "@chakra-ui/react";

const Banner = () => {
  return (
    <Container
      maxW="7xl"
      mt={{ base: 12, md: "5rem" }}
      bgGradient="linear(to-b, purple.800, white.300)"
      p={0}
    >
      <Box align="start" m={3} mb={4}>
        <Heading>Rakeoff Analytics</Heading>
      </Box>
    </Container>
  );
};

export default Banner;

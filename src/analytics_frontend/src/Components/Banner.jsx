import React from "react";
import { Box, Container, Heading } from "@chakra-ui/react";

const Banner = () => {
  return (
    <Container maxW="7xl" mt={{ base: 12, md: "5rem" }} p={0}>
      <Box>
        <Heading>Rakeoff Analytics</Heading>
      </Box>
    </Container>
  );
};

export default Banner;

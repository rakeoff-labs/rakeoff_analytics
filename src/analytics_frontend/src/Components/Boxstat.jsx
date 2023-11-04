import React from "react";
import {
  Box,
  Container,
  Text,
  Heading,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";
import {
  RakeoffRed,
  boxBackgroundColor,
  boxBorderColor,
  boxFontColor,
} from "./colors";

const Boxstat = () => {
  return (
    <Container maxW="7xl" mt={{ base: 3, md: 1 }} p={0}>
      <SimpleGrid
        gap={3}
        columns={[1, 1, 2]}
        spacing={{ base: 3, md: 4 }}
        mx={{ base: 3, md: 3, lg: 0 }}
      >
        <Boxcomponent heading={"HELLO"} />
        <Boxcomponent heading={"HELLO"} />
      </SimpleGrid>
      <Flex
        alignItems="center"
        direction={["column", "column", "row"]}
        justify="space-between"
        mt={{ base: 3, md: 1 }}
        p={{ base: 3, md: 0 }}
      >
        <Smallbox heading={"Hello"} />
        <Smallbox heading={"Hello"} />

        <Flex>
          <Boxcomponent heading={"Stat"} />
        </Flex>
      </Flex>
    </Container>
  );
};

const Boxcomponent = ({ heading }) => {
  return (
    <Box
      bg={boxBackgroundColor}
      border={boxBorderColor}
      borderRadius="2xl"
      py={18}
      transition="transform 0.3s"
      _hover={{ transform: "translateY(-5px)" }}
      cursor="pointer"
      align="center"
      w={{ base: "550px", md: "400px", lg: "600px" }}
      m={2}
    >
      <Heading> {heading}</Heading>
    </Box>
  );
};

const Smallbox = ({ heading }) => {
  return (
    <Box
      bgGradient={`linear(to-br, ${boxBackgroundColor}, purple.500, #6229a8)`}
      border={boxBorderColor}
      borderRadius="2xl"
      py={18}
      transition="transform 0.3s"
      _hover={{ transform: "translateY(-5px)" }}
      cursor="pointer"
      align="center"
      w={{ base: "550px", md: "400px", lg: "285px" }}
      m={2}
    >
      <Heading>{heading}</Heading>
    </Box>
  );
};

export default Boxstat;

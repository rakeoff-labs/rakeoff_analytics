import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Container,
} from "@chakra-ui/react";
import React from "react";
import { SearchIcon } from "@chakra-ui/icons";

const Searchbar = () => {
  return (
    <Container maxW="7xl" mt={{ base: 12, md: "5rem" }} p={0}>
      <Box>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input type="tel" placeholder="Search transactions" />
        </InputGroup>
      </Box>
    </Container>
  );
};

export default Searchbar;

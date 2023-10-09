import { Box, Input, Flex, Container } from "@chakra-ui/react";
import React from "react";
import { SearchIcon } from "@chakra-ui/icons";

const Searchbar = () => {
  return (
    <Box>
      Searchbar
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input type="tel" placeholder="Search for" />
      </InputGroup>
    </Box>
  );
};

export default Searchbar;

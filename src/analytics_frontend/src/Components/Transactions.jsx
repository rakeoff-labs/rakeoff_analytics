import React from "react";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";

const Transactions = () => {
  return (
    <SimpleGrid columns={1}>
      <Flex alignItems="center" justifyContent="center">
        <Box
          borderWidth="1px"
          position="relative"
          borderRadius="lg"
          overflow="hidden"
        >
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <TableCaption>Rakeoff transactions</TableCaption>
              <Thead>
                <Tr>
                  <Th>Transaction hash</Th>
                  <Th>Amount</Th>
                  <Th>Type</Th>
                  <Th>Timestamps</Th>
                  <Th>From</Th>
                  <Th>To</Th>
                </Tr>
              </Thead>
              <Tbody></Tbody>
              <Tfoot></Tfoot>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </SimpleGrid>
  );
};

export default Transactions;

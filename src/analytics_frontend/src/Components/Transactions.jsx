import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  SimpleGrid,
} from "@chakra-ui/react";
import { boxBackgroundColor, boxBorderColor, boxFontColor } from "./colors";

const Transactions = () => {
  return (
    <SimpleGrid>
      <Box
        bg={boxBackgroundColor}
        border={boxBorderColor}
        borderRadius="2xl"
        py={18}
        transition="transform 0.3s"
        _hover={{ transform: "translateY(-5px)" }}
        cursor="pointer"
        align="center"
        m={2}
      >
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Rakeoff transactions</TableCaption>
            <Thead>
              <Tr>
                <Th>Hash</Th>
                <Th>Amout</Th>
                <Th>To</Th>
                <Th>From</Th>
                <Th>Timestamp</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
                <Td isNumeric>25.4</Td>
              </Tr>
              <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
                <Td isNumeric>30.48</Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
                <Td isNumeric>0.91444</Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>To convert</Th>
                <Th>into</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </SimpleGrid>
  );
};

export default Transactions;

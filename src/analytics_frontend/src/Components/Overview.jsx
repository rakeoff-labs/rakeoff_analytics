import React from "react";
import {
  Table,
  TableContainer,
  TableCaption,
  Container,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";

const Overview = () => {
  return (
    <Container maxW="7xl" mt={{ base: 12, md: "5rem" }} p={0}>
      <TableContainer>
        <Table
          variant="simple"
          borderWidth="1px"
          position="relative"
          borderRadius="lg"
          overflow="hidden"
        >
          <TableCaption>Overview</TableCaption>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};
export default Overview;

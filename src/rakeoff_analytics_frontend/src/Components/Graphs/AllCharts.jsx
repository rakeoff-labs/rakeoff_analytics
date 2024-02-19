import React from "react";
import { Container, SimpleGrid } from "@chakra-ui/react";

import PoolHistory from "./PoolHistory";
import GitHub from "./GitHub";
import StakedTVL from "./StakedTVL";

export default function AllCharts() {
  return (
    <Container maxW="7xl" mt={{ base: 3, md: 1 }}>
      <SimpleGrid
        gap={3}
        columns={[1, 1, 2]}
        spacing={{ base: 3, md: 8 }}
        templateAreas={[
          `"Tvl"
            "Githubcommits"
            "PoolHistory"`,
          null,
          `"Tvl Githubcommits"
            "Tvl PoolHistory"`,
        ]}
      >
        <PoolHistory />
        <StakedTVL />
        <GitHub />
      </SimpleGrid>
    </Container>
  );
}

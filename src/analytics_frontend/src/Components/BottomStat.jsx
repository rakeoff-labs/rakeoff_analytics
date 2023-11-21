import React from "react";
import {
  Container,
  SimpleGrid,
  useBreakpointValue,
  Box,
  Heading,
} from "@chakra-ui/react";

import { boxBackgroundColor, boxBorderColor } from "./colors";

const BottomStat = ({
  highestWinner,
  higestPool,
  totalWinners,
  claimedICP,
  totalClaim,
}) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <Container maxW="7xl" mt={{ base: 3, md: 1 }} p={0}>
      <Heading
        textAlign={{ base: "center", lg: "start" }}
        size={{ base: "md", md: "lg" }}
        m={{ base: 6, md: 3 }}
        color="white"
      >
        ICP Pools
      </Heading>
      <SimpleGrid
        gap={3}
        columns={[1, 1, 3]}
        spacing={{ base: 3, md: 4 }}
        mx={{ base: 5, md: 5, lg: 0 }}
      >
        <StoryBoxAndImage
          isDesktop={isDesktop}
          heading={highestWinner}
          info="Highest prize won"
        />
        <StoryBoxAndImage
          isDesktop={isDesktop}
          heading={higestPool}
          info="Highest pool"
        />
        <StoryBoxAndImage
          isDesktop={isDesktop}
          heading={totalWinners}
          info="Total winners"
        />
      </SimpleGrid>
      <Heading
        textAlign={{ base: "center", lg: "start" }}
        size={{ base: "md", md: "lg" }}
        m={{ base: 6, md: 3 }}
        color="white"
      >
        ICP Bonuses
      </Heading>

      <SimpleGrid
        gap={3}
        columns={[2, 1, 2]}
        mx={{ base: 5, md: 5, lg: 0 }}
        spacing={{ base: 3, md: 4 }}
      >
        <StoryBoxAndImage
          heading={claimedICP}
          isDesktop={isDesktop}
          info=" ICP bonuses claimed"
        />
        <StoryBoxAndImage
          isDesktop={isDesktop}
          heading={totalClaim}
          info="Total claims"
        />
      </SimpleGrid>
    </Container>
  );
};

export default BottomStat;
const StoryBoxAndImage = ({ isDesktop, heading, info }) => {
  return (
    <Box
      bg={boxBackgroundColor}
      border={boxBorderColor}
      borderRadius="2xl"
      py={18}
      align="center"
      m={2}
      p={6}
      w="100%"
    >
      <Heading
        size={isDesktop ? "lg" : "md"}
        textAlign="center"
        m={3}
        mb={3}
        color="white"
      >
        {heading}
      </Heading>

      <Heading size={isDesktop ? "md" : "md"} color="gray.300">
        {info}
      </Heading>
    </Box>
  );
};

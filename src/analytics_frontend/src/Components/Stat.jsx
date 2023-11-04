import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Container,
  VStack,
} from "@chakra-ui/react";
import { startAnalyticsClient } from "./Client";
import {
  RakeoffRed,
  boxBackgroundColor,
  boxBorderColor,
  boxFontColor,
} from "./colors";

const Stats = () => {
  // const [analyticsObject, setAnalyticsObject] = useState("");
  // const [loaded, setLoaded] = useState(false);

  // const fetchStats = async () => {
  //   const analyticsClient = await startAnalyticsClient();

  //   const analyticsdata = await analyticsClient.get_rakeoff_analytics();

  //   setAnalyticsObject(analyticsdata);
  //   setLoaded(true);
  // };

  // useEffect(() => {
  //   fetchStats();
  // }, []);

  return (
    <Container maxW="7xl" mt={{ base: 3, md: 1 }} p={0}>
      <SimpleGrid
        gap={3}
        columns={[1, 1, 4]}
        spacing={{ base: 3, md: 8 }}
        mx={{ base: 3, md: 3, lg: 0 }}
        w="100%"
      >
        <StoryBoxAndImage heading={78} info="Fees collected" />
        <StoryBoxAndImage heading={34} info="Total users" />
        <StoryBoxAndImage heading={8} info="Total Staked  USD" />
        <StoryBoxAndImage heading={88} info="Average staking amount" />
      </SimpleGrid>
    </Container>
  );
};
export default Stats;

const StoryBoxAndImage = ({ heading, info }) => {
  return (
    <Box
      bgGradient={`linear(to-bl, ${boxBackgroundColor}, purple.500, #6229a8)`}
      border={boxBorderColor}
      borderRadius="2xl"
      py={18}
      transition="transform 0.3s"
      _hover={{ transform: "translateY(-5px)" }}
      cursor="pointer"
      align="center"
      m={2}
      p={6}
      w={{ base: "550px", md: "400px", lg: "285px" }}
    >
      <Heading size="lg" textAlign="center" m={3} mb={3} color="white">
        {heading}
      </Heading>
      <Text textAlign="center" maxW={"md"}>
        {info}
      </Text>
    </Box>
  );
};

// heading={
//   loaded
//     ? analyticsObject.icp_fees_collected.toString()
//     : "loading..."
// }

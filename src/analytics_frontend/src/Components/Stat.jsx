import React, { useEffect, useState } from "react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
  Box,
  Heading,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { startAnalyticsClient } from "./Client";
import { boxBackgroundColor, boxBorderColor, boxFontColor } from "./colors";

const Stats = () => {
  const [analyticsObject, setAnalyticsObject] = useState("");
  const [loaded, setLoaded] = useState(false);

  const fetchStats = async () => {
    const analyticsClient = await startAnalyticsClient();

    const analyticsdata = await analyticsClient.get_rakeoff_analytics();

    setAnalyticsObject(analyticsdata);
    setLoaded(true);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <SimpleGrid columns={[2, 1, 4]}>
      <>
        <Box>
          <StoryBoxAndImage
            heading={
              loaded
                ? analyticsObject.icp_fees_collected.toString()
                : "loading..."
            }
            info="Fees collected"
          />
        </Box>
        <Box>
          <StoryBoxAndImage
            heading={
              loaded
                ? analyticsObject.icp_fees_collected.toString()
                : "loading..."
            }
            info="Total users"
          />
        </Box>
        <Box>
          <StoryBoxAndImage
            heading={
              loaded
                ? analyticsObject.icp_fees_collected.toString()
                : "loading..."
            }
            info="Total Staked  USD"
          />
        </Box>
        <Box>
          <StoryBoxAndImage
            heading={
              loaded
                ? analyticsObject.icp_fees_collected.toString()
                : "loading..."
            }
            info="Average staking amount"
          />
        </Box>
      </>
    </SimpleGrid>
  );
};
export default Stats;

const StoryBoxAndImage = ({ heading, link, info }) => {
  return (
    <a href={link} target="_blank">
      <Box
        bg={boxBackgroundColor}
        border={boxBorderColor}
        borderRadius="2xl"
        justifyContent="start"
        py={18}
        transition="transform 0.3s"
        _hover={{ transform: "translateY(-5px)" }}
        cursor="pointer"
        align="center"
        m={2}
      >
        <Heading size="lg" textAlign="center" m={3} mb={3} color="white">
          {heading}
        </Heading>
        <Text textAlign="center" maxW={"md"}>
          {info}
        </Text>
      </Box>
    </a>
  );
};

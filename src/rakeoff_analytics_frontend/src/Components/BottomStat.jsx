import React, { useContext } from "react";
import {
  Container,
  SimpleGrid,
  Box,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Flex,
} from "@chakra-ui/react";
import { RakeoffContext } from "../store/Rakeoff-context";
import { boxBackgroundColor, boxBorderColor } from "./colors";
import { InfoIcon } from "@chakra-ui/icons";

const BottomStat = () => {
  const { rakeoffStats } = useContext(RakeoffContext);
  return (
    <Container maxW="7xl" mt={{ base: 3, md: 1 }}>
      <Text color="white" fontWeight={500} mt={6} mb={3}>
        Pool analytics
      </Text>
      <SimpleGrid gap={3} columns={[2, 2, 4]}>
        <BoxStat
          stat={rakeoffStats.total_rewards}
          title="Total rewards"
          extraInfo={
            "The total USD value of all the rewards from previous prize pools on Rakeoff."
          }
        />
        <BoxStat
          stat={`${rakeoffStats.highest_pool_win_amount} ICP`}
          title="Highest prize"
        />
        <BoxStat
          stat={`${rakeoffStats.highest_pool_amount} ICP`}
          title="Largest pool"
        />
        <BoxStat
          stat={`${rakeoffStats.total_pool_winners} Winners`}
          title="Total winners"
        />
        <BoxStat
          stat={`${rakeoffStats.average_icp_per_pool} ICP`}
          title="Average pool"
        />
        <BoxStat
          stat={`${rakeoffStats.average_pool_win} ICP`}
          title="Average win"
        />
        <BoxStat
          stat={rakeoffStats.total_successful_pools}
          title="Successful pools"
        />
        <BoxStat
          stat={rakeoffStats.total_transaction_failures}
          title="Failed transfers"
          extraInfo={
            "Tallies the total number of unsuccessful prize transfers to winners of the prize pool."
          }
        />
      </SimpleGrid>

      <Text color="white" fontWeight={500} mt={6} mb={3}>
        Achievement analytics
      </Text>
      <SimpleGrid gap={3} columns={[2, 2, 2]}>
        <BoxStat
          stat={rakeoffStats.total_claims_from_achievments}
          title="Total claims"
          extraInfo={
            "The total number of stakers who have claimed at least one bonus from Rakeoff achievements."
          }
        />
        <BoxStat
          stat={`${rakeoffStats.claimed_from_achievements} ICP`}
          title="Bonuses claimed"
        />
      </SimpleGrid>

      <Text color="white" fontWeight={500} mt={6} mb={3}>
        Fees analytics
      </Text>
      <SimpleGrid gap={3} columns={[2, 2, 3]}>
        <BoxStat
          stat={`${rakeoffStats.fees_from_disbursement} ICP`}
          title="Disbursement fees"
        />
        <BoxStat
          stat={`${rakeoffStats.fees_from_prize_pool} ICP`}
          title="Pool fees"
        />
        <BoxStat stat={`${rakeoffStats.total_fees} ICP`} title="Total fees" />
      </SimpleGrid>
    </Container>
  );
};

export default BottomStat;

const BoxStat = ({ stat, title, extraInfo }) => {
  return (
    <Box
      bg={boxBackgroundColor}
      border={boxBorderColor}
      borderRadius="2xl"
      p={3}
      w="100%"
    >
      <Flex align="center" gap={1}>
        <Text color="#a5a8b6" noOfLines={1}>
          {title}
        </Text>
        {extraInfo ? <InfoPopover details={extraInfo} /> : null}
      </Flex>
      <Text color="white" fontSize={{ base: "xl", md: "3xl" }} noOfLines={1}>
        {stat}
      </Text>
    </Box>
  );
};

const InfoPopover = ({ details }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <InfoIcon
          color="gray.500"
          aria-label="info"
          _hover={{
            cursor: "pointer",
            transform: "scale(1.1)",
            transition: "transform 0.2s",
          }}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody color="white">{details}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

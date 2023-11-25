import React from "react";
import {
  Container,
  SimpleGrid,
  Box,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
} from "@chakra-ui/react";
import { boxBackgroundColor, boxBorderColor } from "./colors";
import { InfoIcon } from "@chakra-ui/icons";

const BottomStat = ({
  highestWinner,
  highestPool,
  totalWinners,
  claimedICP,
  totalClaim,
  getrewards,
  averageStake,
  averagePerPool,
  averagePoolWin,
  totalSuccessfulPools,
  totalTransactionFailures,
  icpFeesFromDisbursement,
}) => {
  // TODO more stats could do with extraInfo
  // TODO need to explain in info that disbursement fees is only from ICP disbursement option
  // TODO probably other stats need explanations
  return (
    <Container maxW="7xl" mt={{ base: 3, md: 1 }}>
      <Text color="white" fontWeight={500} mt={6} mb={3}>
        Pool analytics
      </Text>
      <SimpleGrid gap={3} columns={[2, 2, 4]}>
        <BoxStat
          stat={getrewards}
          title="Total rewards"
          extraInfo={
            "The total USD value of all the rewards from previous prize pools on Rakeoff, excluding staking rewards"
          }
        />
        <BoxStat stat={`${highestWinner} ICP`} title="Highest prize" />
        <BoxStat stat={`${highestPool} ICP`} title="Largest pool" />
        <BoxStat stat={`${totalWinners} Winners`} title="Total winners" />
      </SimpleGrid>

      <Text color="white" fontWeight={500} mt={6} mb={3}>
        Achievement analytics
      </Text>
      <SimpleGrid gap={3} columns={[2, 2, 2]}>
        <BoxStat stat={`${totalClaim} Stakers`} title="Total claims" />
        <BoxStat stat={`${claimedICP} ICP`} title="Bonuses claimed" />
      </SimpleGrid>

      <Text color="white" fontWeight={500} mt={6} mb={3}>
        More analytics
      </Text>
      <SimpleGrid gap={3} columns={[2, 2, 3]}>
        <BoxStat stat={`${averageStake} ICP`} title="Average stake" />
        <BoxStat stat={`${averagePerPool} ICP`} title="Average pool" />
        <BoxStat stat={`${averagePoolWin} ICP`} title="Average win" />
        <BoxStat stat={totalSuccessfulPools} title="Successful pools" />
        <BoxStat stat={totalTransactionFailures} title="Transaction failures" />
        <BoxStat
          stat={`${icpFeesFromDisbursement} ICP`}
          title="Disbursement fees"
        />
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
      <Text color="#a5a8b6" noOfLines={1}>
        {title} {extraInfo ? <InfoPopover details={extraInfo} /> : null}
      </Text>
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
          mb={1}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody color="white">{details}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

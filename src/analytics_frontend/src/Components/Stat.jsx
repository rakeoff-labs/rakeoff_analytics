import React, { useEffect, useState } from "react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
} from "@chakra-ui/react";

const Stats = () => {
  return (
    <StatGroup>
      <Stat>
        <StatLabel>Fees collected</StatLabel>
        <StatNumber>£0.00</StatNumber>
        <StatHelpText>From disbursements</StatHelpText>
      </Stat>
    </StatGroup>
  );
};
export default Stats;

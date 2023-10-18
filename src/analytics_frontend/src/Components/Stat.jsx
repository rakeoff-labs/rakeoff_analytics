import React, { useEffect, useState } from "react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
} from "@chakra-ui/react";
import { startAnalyticsClient } from "./Client";

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
    <StatGroup>
      <Stat>
        <StatLabel>Fees collected</StatLabel>
        <StatNumber>
          {loaded
            ? analyticsObject.icp_fees_collected.toString()
            : "loading..."}
        </StatNumber>
        <StatHelpText>From disbursements</StatHelpText>
      </Stat>
      <Stat>
        <StatLabel>Fees collected</StatLabel>
        <StatNumber>
          {loaded
            ? analyticsObject.icp_fees_collected.toString()
            : "loading..."}
        </StatNumber>
        <StatHelpText>From disbursements</StatHelpText>
      </Stat>
    </StatGroup>
  );
};
export default Stats;

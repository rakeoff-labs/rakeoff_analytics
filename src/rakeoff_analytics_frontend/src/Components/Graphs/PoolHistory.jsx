import React, { useContext } from "react";
import {
  XAxis,
  Bar,
  YAxis,
  Tooltip,
  BarChart,
  ResponsiveContainer,
} from "recharts";
import { Box, Flex, Text } from "@chakra-ui/react";

import { boxBackgroundColor, boxBorderColor } from "../colors";
import { e8sToIcp, roundUplatest } from "../tools";
import moment from "moment";
import { RakeoffContext } from "../../store/Rakeoff-context";
const PoolHistory = () => {
  const { rakeoffStats } = useContext(RakeoffContext);

  const formattedData = rakeoffStats.pool_history.map((item) => {
    return {
      date: moment(item.timestamp / 1000000).format("MMM"),
      icp: e8sToIcp(item.amount).toFixed(2),
    };
  });

  const totalAmount = formattedData.reduce((total, currentItem) => {
    return total + parseFloat(currentItem.icp);
  }, 0);

  // finding the largest pool amount
  const largestPoolAmount = Math.max(
    ...formattedData.map((item) => parseFloat(item.icp))
  );

  return (
    <Box gridArea="PoolHistory">
      <Box
        border={boxBorderColor}
        bg={boxBackgroundColor}
        borderRadius="2xl"
        align="center"
        p={3}
        w="100%"
      >
        <Flex justify="center" mb={3} align="center" gap={1}>
          <Text color="#a5a8b6">Total ICP pool rewards:</Text>
          <Text fontWeight={500} color="white">
            {Math.round(totalAmount)} ICP
          </Text>
        </Flex>
        <ResponsiveContainer width={"100%"} height={200}>
          <BarChart data={formattedData}>
            <XAxis dataKey="date" />
            <YAxis
              width={56}
              tickFormatter={(value) => `${value.toFixed(0)} ICP`}
              domain={[0, roundUplatest(largestPoolAmount, 10)]}
            />
            <Tooltip />
            <Bar dataKey="icp" fill="#8a2be2" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default PoolHistory;

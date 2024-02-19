import React, { useContext } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { Box, useBreakpointValue, Flex, Text } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { boxBackgroundColor, boxBorderColor } from "../colors";
import { roundUplatest } from "../tools";
import moment from "moment";
import { RakeoffContext } from "../../store/Rakeoff-context";
const StakedTVL = () => {
  const { rakeoffStats } = useContext(RakeoffContext);

  const isDesktop = useBreakpointValue({ base: false, md: false, lg: true });

  if (!rakeoffStats.tvl_history) {
    return "Unable to retrieve TVL data. Please check the latest information at: https://defillama.com/protocol/rakeoff";
  }

  const formattedData = rakeoffStats.tvl_history.tvl
    .slice(-12) // showing the last 12 days
    .map((item) => ({
      date: moment.unix(item.date).format("MMM DD"),
      usd: item.totalLiquidityUSD.toFixed(2),
    }));

  const latestValue = roundUplatest(
    formattedData[formattedData.length - 1].usd,
    100000
  );

  return (
    <Box gridArea="Tvl">
      <Box
        bg={boxBackgroundColor}
        border={boxBorderColor}
        borderRadius="2xl"
        align="center"
        p={3}
        w="100%"
      >
        <>
          <Flex justify="center" mb={3} align="center" gap={1}>
            <Text color="#a5a8b6">Total value locked:</Text>
            <Text fontWeight={500} color="white">
              $
              {Math.round(
                rakeoffStats.tvl_history.tvl[
                  rakeoffStats.tvl_history.tvl.length - 1
                ].totalLiquidityUSD
              ).toLocaleString("en-US")}
            </Text>
          </Flex>
          <ResponsiveContainer width={"100%"} height={isDesktop ? 450 : 350}>
            <AreaChart data={formattedData}>
              <XAxis dataKey="date" />
              <YAxis
                width={56} // set all to 56 so 'ICP' and 'cmt' can fit on one one line
                type="number"
                domain={[0, latestValue]}
                tickFormatter={(value) =>
                  `$${
                    value >= 1000
                      ? `${(value / 1000).toFixed(0)}k`
                      : value.toString()
                  }`
                }
              />

              <Area
                type="monotone"
                dataKey="usd"
                stroke="#8884d8"
                fill="#8a2be2"
              />
              <Tooltip />
            </AreaChart>
          </ResponsiveContainer>
          <Flex align="center" gap={1} mb={0.5} justify="center">
            <Text color="#a5a8b6">Source:</Text>
            <Text
              as="a"
              href="https://defillama.com/protocol/rakeoff"
              target="_blank"
              color={"white"}
              _hover={{ opacity: "0.8", cursor: "pointer" }}
              fontWeight={500}
            >
              DefiLlama <ExternalLinkIcon mb={1} />
            </Text>
          </Flex>
        </>
      </Box>
    </Box>
  );
};

export default StakedTVL;

import React from "react";
import {
  XAxis,
  Bar,
  YAxis,
  LineChart,
  Line,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  BarChart,
} from "recharts";
import {
  Box,
  Container,
  SimpleGrid,
  useBreakpointValue,
  Flex,
  Text,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { boxBackgroundColor, boxBorderColor } from "./colors";
import { e8sToIcp } from "./tools";
import moment from "moment";

export default function Graph({
  tvlChartData,
  commitsChartData,
  poolHistoryChartData,
}) {
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
        <PoolHistoryBarChart poolHistoryChartData={poolHistoryChartData} />
        <TvlChart tvlChartData={tvlChartData} />
        <CommitLineChart commitsChartData={commitsChartData} />
      </SimpleGrid>
    </Container>
  );
}

const TvlChart = ({ tvlChartData }) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  const formattedData = tvlChartData.tvl.map((item) => {
    return {
      date: moment.unix(item.date).format("MMM DD"),
      usd: item.totalLiquidityUSD.toFixed(2),
    };
  });

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
        <Flex justify="center" mb={3} align="center" gap={1}>
          <Text color="#a5a8b6">Total value locked:</Text>
          <Text fontWeight={500} color="white">
            $
            {Math.round(
              tvlChartData.tvl[tvlChartData.tvl.length - 1].totalLiquidityUSD
            ).toLocaleString("en-US")}
          </Text>
        </Flex>
        <AreaChart
          data={formattedData}
          width={isDesktop ? 580 : 300}
          height={isDesktop ? 450 : 350}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            type="number"
            tickFormatter={(value) =>
              `$${
                value >= 1000
                  ? `${(value / 1000).toFixed(0)}k`
                  : value.toString()
              }`
            }
            width={30}
          />

          <Area type="monotone" dataKey="usd" stroke="#8884d8" fill="#8a2be2" />
          <Tooltip />
        </AreaChart>
        <Flex align="center" gap={1} justify="center">
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
      </Box>
    </Box>
  );
};

const CommitLineChart = ({ commitsChartData }) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  const commitsByMonth = commitsChartData.edges.reduce(
    (acc, { node: { committedDate } }) => {
      // Format the date to a 'Month Year' format using Moment.js
      const monthYear = moment(committedDate).format("MMM YY");

      // If this month-year combination is already in the accumulator, increment its count
      if (acc[monthYear]) {
        acc[monthYear]++;
      } else {
        // Otherwise, initialize it with 1
        acc[monthYear] = 1;
      }

      return acc;
    },
    {}
  );

  // Convert the object into an array of the desired format
  const commitsData = Object.entries(commitsByMonth).map(
    ([month, commits]) => ({
      month,
      commits,
    })
  );

  // Sort the array by date (earliest first)
  commitsData.sort((a, b) => {
    // Convert the 'MMM YY' format back to a date object
    const dateA = moment(a.month, "MMM YY").toDate();
    const dateB = moment(b.month, "MMM YY").toDate();

    return dateA - dateB;
  });
  return (
    <Box gridArea="Githubcommits">
      <Box
        bg={boxBackgroundColor}
        border={boxBorderColor}
        borderRadius="2xl"
        align="center"
        p={3}
        w="100%"
      >
        <Flex justify="center" mb={3} align="center" gap={1}>
          <Text color="#a5a8b6">Total commits:</Text>
          <Text fontWeight={500} color="white">
            {commitsChartData.totalCount}
          </Text>
        </Flex>
        <LineChart
          mb={4}
          width={isDesktop ? 580 : 300}
          height={200}
          data={commitsData}
        >
          <XAxis dataKey="month" />
          <YAxis width={30} />

          <Line type="monotone" dataKey="commits" stroke="#8a2be2" />
          <Tooltip />
        </LineChart>
      </Box>
    </Box>
  );
};

const PoolHistoryBarChart = ({ poolHistoryChartData }) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  const formattedData = poolHistoryChartData.map((item) => {
    return {
      date: moment(item.timestamp / 1000000).format("MMM"),
      amount: e8sToIcp(item.amount).toFixed(2),
    };
  });

  const totalAmount = formattedData.reduce((total, currentItem) => {
    return total + parseFloat(currentItem.amount);
  }, 0);

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
            {totalAmount} ICP
          </Text>
        </Flex>
        <BarChart
          width={isDesktop ? 580 : 300}
          height={200}
          data={formattedData}
        >
          <XAxis dataKey="date" />
          <YAxis
            width={50}
            tickFormatter={(value) => `${value.toFixed(0)} ICP`}
          />
          <Bar dataKey="amount" fill="#8a2be2" barSize={50} />
        </BarChart>
      </Box>
    </Box>
  );
};

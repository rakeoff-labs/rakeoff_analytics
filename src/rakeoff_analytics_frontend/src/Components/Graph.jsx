import React from "react";
import {
  XAxis,
  Bar,
  YAxis,
  LineChart,
  Line,
  Tooltip,
  AreaChart,
  Area,
  BarChart,
  ResponsiveContainer,
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
import { e8sToIcp, roundUplatest } from "./tools";
import moment from "moment";

export default function Graph({
  tvlChartData,
  commitsChartData,
  poolHistoryChartData,
  totalCommits,
  objects,
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
        <CommitLineChart
          commitsChartData={commitsChartData}
          totalCommits={totalCommits}
          objects={objects}
        />
      </SimpleGrid>
    </Container>
  );
}

const TvlChart = ({ tvlChartData }) => {
  const isDesktop = useBreakpointValue({ base: false, md: false, lg: true });

  if (!tvlChartData) {
    return "Unable to retrieve TVL data. Please check the latest information at: https://defillama.com/protocol/rakeoff";
  }

  const formattedData = tvlChartData.tvl
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
        <Flex justify="center" mb={3} align="center" gap={1}>
          <Text color="#a5a8b6">Total value locked:</Text>
          <Text fontWeight={500} color="white">
            $
            {Math.round(
              tvlChartData.tvl[tvlChartData.tvl.length - 1].totalLiquidityUSD
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
      </Box>
    </Box>
  );
};

const CommitLineChart = ({ objects, totalCommits }) => {
  const names = objects.map((item) => item[0]);
  console.log("the names of the chart", names);

  // const commitsByMonth = commitsChartData.edges.reduce(
  //   (acc, { node: { committedDate } }) => {
  //     // Format the date to a 'Month Year' format using Moment.js
  //     const monthYear = moment(committedDate).format("MMM YY");

  //     // If this month-year combination is already in the accumulator, increment its count
  //     if (acc[monthYear]) {
  //       acc[monthYear]++;
  //     } else {
  //       // Otherwise, initialize it with 1
  //       acc[monthYear] = 1;
  //     }

  //     return acc;
  //   },
  //   {}
  // );

  // Convert the object into an array of the desired format
  // const commitsData = Object.entries(commitsByMonth).map(
  //   ([month, commits]) => ({
  //     month,
  //     commits,
  //   })
  // );

  // // Sort the array by date (earliest first)
  // commitsData.sort((a, b) => {
  //   // Convert the 'MMM YY' format back to a date object
  //   const dateA = moment(a.month, "MMM YY").toDate();
  //   const dateB = moment(b.month, "MMM YY").toDate();

  //   return dateA - dateB;
  // });
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
          <Text color="#a5a8b6">Total GitHub commits:</Text>
          <Text fontWeight={500} color="white">
            {totalCommits}
          </Text>
        </Flex>
        <ResponsiveContainer width={"100%"} height={200}>
          <LineChart mb={4} height={200}>
            <XAxis dataKey={names} />

            <YAxis
              width={56}
              tickFormatter={(value) => `${value.toFixed(0)} cmt`} // added 'cmt' as looked bland compared to the other graphs
            />

            <Line type="monotone" dataKey="commits" stroke="#8a2be2" />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

const PoolHistoryBarChart = ({ poolHistoryChartData }) => {
  const formattedData = poolHistoryChartData.map((item) => {
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

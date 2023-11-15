import React, { useEffect, useState } from "react";
import {
  BarChart,
  XAxis,
  Bar,
  YAxis,
  LineChart,
  Line,
  Tooltip,
} from "recharts";
import { boxBackgroundColor, boxBorderColor } from "./colors";
import { getRakeoffStats, icpToDollars } from "./tools";

import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  useBreakpointValue,
  Center,
} from "@chakra-ui/react";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function Graph() {
  const [graphData, setGraphData] = useState([]);

  const getGraphData = async () => {
    const getGraph = await getRakeoffStats();

    const dataPromises = getGraph.pool_history_chart_data.map(async (item) => {
      const date = new Date(item.timestamp / 1000000); // Convert nanoseconds to milliseconds
      const usdAmount = await icpToDollars(item.amount);
      return {
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`, // Format the date
        amount: usdAmount,
      };
    });

    const formattedData = await Promise.all(dataPromises); // Resolve all promises

    const aggregateDataByMonth = (data) => {
      const aggregatedData = {};

      data.forEach((item) => {
        const monthKey = item.date; // Assuming item.date is already in the format 'YYYY-MM-DD'
        if (!aggregatedData[monthKey]) {
          aggregatedData[monthKey] = { ...item };
        } else {
          aggregatedData[monthKey].amount += item.amount;
        }
      });

      return Object.values(aggregatedData);
    };

    const aggregatedData = aggregateDataByMonth(formattedData); // Use the resolved data
    setGraphData(aggregatedData); // Update state with aggregated data
  };

  useEffect(() => {
    getGraphData();
  }, []);

  const GraphQl = async () => {
    const query = `
  query ($orgName: String!, $repoName: String!) {
      repository(owner: $orgName, name: $repoName) {
        defaultBranchRef {
          target {
            ... on Commit {
              history {
                totalCount
                edges {
                  node {
                    committedDate
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

    const token = process.env.REACT_APP_GITHUB_TOKEN;
    const variables = {
      orgName: "rakeoff-labs",
      repoName: "rakeoff",
    };

    const body = {
      query,
      variables,
    };
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const gitHub = await res.json();

    const history = gitHub.data.repository.defaultBranchRef.target.history;
    console.log(history);
    return history;
  };
  const [totalCommits, setTotalCommits] = useState(0);
  const [detailCommit, setDetailCommit] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    GraphQl()
      .then((history) => {
        setTotalCommits(history.totalCount);
        setDetailCommit(history.edges);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const aggregateCommitsByMonth = (edges, monthNames) => {
    const commitCountsByMonth = {};

    edges.forEach(({ node: { committedDate } }) => {
      const date = new Date(committedDate);
      const monthIndex = date.getMonth();
      const yearMonth = `${monthNames[monthIndex]}`;

      if (!commitCountsByMonth[yearMonth]) {
        commitCountsByMonth[yearMonth] = 0;
      }
      commitCountsByMonth[yearMonth]++;
    });

    return Object.keys(commitCountsByMonth)
      .map((month) => ({
        month,
        commits: commitCountsByMonth[month],
      }))
      .reverse();
  };

  useEffect(() => {
    if (detailCommit.length > 0) {
      const processedChartData = aggregateCommitsByMonth(
        detailCommit,
        monthNames
      );
      setChartData(processedChartData);
    }
  }, [detailCommit]);

  // const chartData = monthNames[aggregateCommitsByMonth(detailCommit)];

  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return (
    <Container maxW="7xl" mt={{ base: 3, md: 1 }} p={0}>
      <Center>
        <SimpleGrid
          gap={3}
          columns={[1, 1, 2]}
          spacing={{ base: 3, md: 8 }}
          mx={{ base: 3, md: 3, lg: 0 }}
          w="100%"
          templateAreas={[
            `"Poolhistory"
            "Githubcommits"
            "Othergraph"`,
            null,
            `"Poolhistory Githubcommits"
            "Poolhistory Othergraph"`,
          ]}
        >
          <Box gridArea="Poolhistory">
            <Box
              bg={boxBackgroundColor}
              border={boxBorderColor}
              borderRadius="2xl"
              py={18}
              transition="transform 0.3s"
              _hover={{ transform: "translateY(-5px)" }}
              cursor="pointer"
              align="center"
              m={2}
              w={{ base: "400px", md: "400px", lg: "100%" }}
              height={530}
            >
              <Heading size="md">Pool history</Heading>
              <BarChart
                width={isDesktop ? 580 : 400}
                height={450}
                data={graphData}
                margin={{ top: 10, right: 50, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="date" />
                <YAxis />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </Box>
          </Box>
          <Box gridArea="Githubcommits">
            <BoxLayout>
              <Heading size="md">dApp commits : {totalCommits}</Heading>
              <Center>
                <LineChart
                  mb={4}
                  width={isDesktop ? 680 : 420}
                  height={200}
                  data={chartData}
                  align="center"
                  margin={{
                    top: 15,
                    right: 80,
                    left: 30,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="month" />
                  <YAxis />

                  <Line type="monotone" dataKey="commits" stroke="#82ca9d" />
                  <Tooltip />
                </LineChart>
              </Center>
            </BoxLayout>
          </Box>
          <Box gridArea="Othergraph">
            <BoxLayout heading={"Github"} />
          </Box>
        </SimpleGrid>
      </Center>
    </Container>
  );
}

const BoxLayout = ({ isDesktop, children }) => {
  return (
    <Box
      // bgGradient={`linear(to-b, ${boxBackgroundColor}, purple.500, #6229a8)`}
      border={boxBorderColor}
      bg={boxBackgroundColor}
      borderRadius="2xl"
      py={18}
      transition="transform 0.3s"
      _hover={{ transform: "translateY(-5px)" }}
      cursor="pointer"
      align="center"
      m={2}
      p={2}
      height={250}
      w={isDesktop ? 300 : "100%"}
    >
      {/* <Heading size="md">{heading}</Heading> */}
      {children}
    </Box>
  );
};

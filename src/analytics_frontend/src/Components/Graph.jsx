import React, { useEffect, useState } from "react";
import {
  XAxis,
  Bar,
  YAxis,
  LineChart,
  Line,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
} from "recharts";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  useBreakpointValue,
  Center,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { boxBackgroundColor, boxBorderColor } from "./colors";
import { getRakeoffStats, icpToDollars } from "./tools";

export default function Graph() {
  // RAKEOFF API ///
  /////////////////
  const [graphData, setGraphData] = useState([]);

  const monthNamespool = [
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

  const getGraphData = async () => {
    const getGraph = await getRakeoffStats();
    // filtering though the history using map
    const dataPromises = getGraph.pool_history_chart_data.map(async (item) => {
      const date = new Date(item.timestamp / 1000000);
      const monthYear = monthNamespool[date.getMonth()];
      let usdAmount = await icpToDollars(item.amount); // Convert to USD

      // Convert the formatted currency string to a number
      usdAmount = Number(usdAmount.replace(/[^0-9.-]+/g, ""));

      const numDigits = Math.ceil(Math.log10(usdAmount + 1));
      //rounding to show two digit
      const totalAmount = Math.floor(usdAmount / Math.pow(10, numDigits - 2));
      const totalUsdAmount = graphData.reduce(
        (acc, item) => acc + item.amount,
        0
      );
      const formattedTotalUsdAmount = `$${totalUsdAmount.toFixed(2)}`;

      console.log(totalAmount);

      return {
        date: monthYear,
        amount: usdAmount,
      };
    });
    const formattedData = await Promise.all(dataPromises);

    // Showing several months since we dont have all the history
    const allMonths = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
    const baseData = allMonths.map((month) => ({ date: month, amount: "$0" }));

    // Merge actual data with base data
    const mergedData = baseData.map((baseItem) => {
      const actualItem = formattedData.find(
        (item) => item.date === baseItem.date
      );
      return actualItem || baseItem;
    });

    setGraphData(mergedData);
  };

  useEffect(() => {
    getGraphData();
  }, []); //

  // GITHUB API ///
  /////////////////

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

  // Aggregates commits each month///
  /////////////////
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

    return (
      Object.keys(commitCountsByMonth)
        // maps to check the months of commits
        .map((month) => ({
          month,
          commits: commitCountsByMonth[month],
        }))
        .reverse()
    );
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

  const isDesktop = useBreakpointValue({ base: false, lg: true });

  const [defiLama, setDefiLama] = useState([]);
  const [totalVal, setTotalVal] = useState(0);

  useEffect(() => {
    fetch("https://api.llama.fi/protocol/rakeoff")
      .then((response) => {
        if (!response) {
          throw new Error("no API");
        }
        return response.json();
      })
      .then((data) => {
        const getDates = data.tvl.map((item) => {
          const date = new Date(item.date * 1000);
          const formattedDate = `${date.getDate()} ${date.toLocaleString(
            "default",
            { month: "short" }
          )}`;
          const formattedTvl = `$${item.totalLiquidityUSD.toLocaleString()}`;

          return {
            date: formattedDate,
            tvl: item.totalLiquidityUSD, // Keep as a number for the Y-axis
            formattedTvl: formattedTvl,
          };
        });
        const mostRecentTvl = data.tvl[data.tvl.length - 1]?.totalLiquidityUSD;
        const roundedTotal = Math.round(mostRecentTvl);
        const formattedTotal = `$${roundedTotal.toLocaleString()}`;
        setDefiLama(getDates);
        setTotalVal(formattedTotal);
      })
      .catch((error) => {
        console.error("catched error", error);
      });
  }, []);

  return (
    <Container maxW="7xl" mt={{ base: 3, md: 1 }} p={0}>
      <Center>
        <SimpleGrid
          gap={3}
          columns={[1, 1, 2]}
          spacing={{ base: 3, md: 8 }}
          mx={{ base: 3, md: 3, lg: 0 }}
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
              align="center"
              m={2}
              w="100%"
              height={530}
            >
              <Heading size="md" color="gray.300" mb={2}>
                Total value locked:{" "}
                <span style={{ color: "white" }}>{totalVal}</span>
              </Heading>

              <ResponsiveContainer height={isDesktop ? 445 : 410} width="100%">
                <AreaChart
                  data={defiLama}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis
                    type="number"
                    domain={[0, 50000]}
                    tickFormatter={(value) =>
                      `$${Math.round(value).toLocaleString()}`
                    }
                  />

                  <Area
                    type="monotone"
                    dataKey="tvl"
                    stroke="#8884d8"
                    fill="#8a2be2"
                  />
                </AreaChart>
              </ResponsiveContainer>
              <Link
                href="https://defillama.com/protocol/rakeoff"
                ml={9}
                isExternal
              >
                DefiLlama
                <ExternalLinkIcon mx="3px" />
              </Link>
            </Box>
          </Box>
          <Box gridArea="Githubcommits">
            <BoxLayout>
              <Heading size="md" mb={2}>
                Total commits to dApp:{" "}
                <span mb={2} style={{ color: "white" }}>
                  {totalCommits}
                </span>
              </Heading>

              <Center>
                <LineChart
                  mb={4}
                  width={isDesktop ? 680 : 300} // anything greater pushes the mobile off
                  height={200}
                  data={chartData}
                  align="center"
                  margin={
                    isDesktop
                      ? { top: 15, right: 80, left: 30, bottom: 0 }
                      : { top: 10, right: 80, left: 10, bottom: 0 }
                  }
                >
                  <XAxis dataKey="month" />
                  <YAxis />

                  <Line type="monotone" dataKey="commits" stroke="#8a2be2" />
                  <Tooltip />
                </LineChart>
              </Center>
            </BoxLayout>
          </Box>
          <Box gridArea="Othergraph">
            <BoxLayout>
              <Heading size="md" mb={2}>
                Pool history <span mb={2} style={{ color: "#8a2be2" }}></span>
              </Heading>
              <BarChart
                width={isDesktop ? 700 : 240} // anything greater pushes the mobile off
                height={200}
                data={graphData}
                margin={
                  isDesktop
                    ? { top: 10, right: 200, left: 0, bottom: 0 }
                    : { top: 10, right: 80, left: 0, bottom: 0 }
                }
              >
                <XAxis dataKey="date" />
                <YAxis tickFormatter={(value) => `$${value.toFixed(0)}`} />
                <Bar dataKey="amount" fill="#8a2be2" barSize={50} />
              </BarChart>
            </BoxLayout>
          </Box>
        </SimpleGrid>
      </Center>
    </Container>
  );
}

const BoxLayout = ({ heading, children }) => {
  return (
    <Box
      border={boxBorderColor}
      bg={boxBackgroundColor}
      borderRadius="2xl"
      py={18}
      align="center"
      m={2}
      p={2}
      height={250}
      w="100%"
    >
      <Heading size="md">{heading}</Heading>

      {children}
    </Box>
  );
};

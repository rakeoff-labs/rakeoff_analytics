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
import IcLogo from "../../assets/ic-logo.png";
import ckbtc_logo from "../../assets/ckbtc_logo.png";
import ethereum_logo from "../../assets/ethereum_logo.png";

import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  useBreakpointValue,
  Center,
  StatNumber,
  Stat,
  StatHelpText,
  Text,
  Flex,
  StatArrow,
  useColorMode,
  Image as ChakraImage,
} from "@chakra-ui/react";

export default function Graph() {
  const { colorMode } = useColorMode();
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

  const [icpPrice, setIcpPrice] = useState(0);
  const [icpPercentChange, setIcpPercentChange] = useState(0);

  useEffect(() => {
    fetch(
      "https://api.pro.coinbase.com/products/ICP-USD/candles?granularity=900"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("We gots an error");
        }
        return response.json();
      })
      .then((data) => {
        const price = data[0][4];
        const price24Ago = data[96][4];
        const percentageChange = ((price - price24Ago) / price24Ago) * 100;
        setIcpPrice(price);
        setIcpPercentChange(percentageChange);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const icpStrokeColor = icpPercentChange > 0 ? "#38A169" : "#E53E3E";
  const arrowType = icpPercentChange > 0 ? "increase" : "decrease";

  const [btcPrice, setBtcPrice] = useState(0);
  const [btcPercentChange, setBtcPercentChange] = useState(0);

  useEffect(() => {
    fetch(
      "https://api.pro.coinbase.com/products/BTC-USD/candles?granularity=900"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("We gots an error");
        }
        return response.json();
      })
      .then((data) => {
        const price = data[0][4];
        const price24Ago = data[96][4];
        const percentageChange = ((price - price24Ago) / price24Ago) * 100;
        setBtcPrice(price);
        setBtcPercentChange(percentageChange);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const btcStrokeColor = btcPercentChange > 0 ? "#38A169" : "#E53E3E";
  const btcarrowType = btcPercentChange > 0 ? "increase" : "decrease";

  const [ethPrice, setEthPrice] = useState(0);
  const [ethPercentChange, setEthPercentChange] = useState(0);

  useEffect(() => {
    fetch(
      "https://api.pro.coinbase.com/products/ETH-USD/candles?granularity=900"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("We gots an error");
        }
        return response.json();
      })
      .then((data) => {
        const price = data[0][4];
        const price24Ago = data[96][4];
        const percentageChange = ((price - price24Ago) / price24Ago) * 100;
        setEthPrice(price);
        setEthPercentChange(percentageChange);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const ethStrokeColor = ethPercentChange > 0 ? "#38A169" : "#E53E3E";
  const etharrowType = ethPercentChange > 0 ? "increase" : "decrease";

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
            <BoxLayout heading={"dapp commits: " + totalCommits}>
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
            <BoxLayout heading="Marketprices">
              <SimpleGrid columns={3} gap={3}>
                <Marketbox
                  price={icpPrice.toFixed(2)}
                  colorSrc="white"
                  StrokeColor={icpStrokeColor}
                  imgSrc={IcLogo}
                  arrowType={arrowType}
                  Percentagechange={icpPercentChange.toFixed(2)}
                  market="ICP"
                />
                <Marketbox
                  StrokeColor={btcStrokeColor}
                  price={btcPrice.toFixed(0)}
                  market="BTC"
                  imgSrc={ckbtc_logo}
                  arrowType={btcarrowType}
                  Percentagechange={btcPercentChange.toFixed(2)}
                />
                <Marketbox
                  StrokeColor={ethStrokeColor}
                  price={ethPrice.toFixed(0)}
                  market="ETH"
                  imgSrc={ethereum_logo}
                  arrowType={etharrowType}
                  Percentagechange={ethPercentChange.toFixed(2)}
                />
              </SimpleGrid>
            </BoxLayout>
          </Box>
        </SimpleGrid>
      </Center>
    </Container>
  );
}

const BoxLayout = ({ isDesktop, heading, children }) => {
  return (
    <Box
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
      <Heading size="md">{heading}</Heading>
      {children}
    </Box>
  );
};

const Marketbox = ({
  isDesktop,
  price,
  StrokeColor,
  arrowType,
  Percentagechange,
  imgSrc,
  colorSrc,
  market,
}) => {
  return (
    <Box
      border={boxBorderColor}
      bg={boxBackgroundColor}
      borderRadius="3xl"
      py={18}
      align="center"
      mt={5}
      p={4}
      height={170}
      w={isDesktop ? 300 : "100%"}
    >
      <Flex>
        <ChakraImage
          src={imgSrc}
          alt="Crypto"
          bg={colorSrc}
          borderRadius="full"
          p={0.5}
          h={"24px"}
          w={"auto"}
        />
        &nbsp;
        <Text color="gray.500">${market}</Text>
      </Flex>
      <Stat>
        <Heading
          size={{ base: "lg", lg: "lg" }}
          textAlign="center"
          m={3}
          mb={3}
          color="white"
        >
          ${price}
        </Heading>

        <StatHelpText color={StrokeColor}>
          <StatArrow type={arrowType} />
          {Percentagechange}%
        </StatHelpText>
      </Stat>
    </Box>
  );
};

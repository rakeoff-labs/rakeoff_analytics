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
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  useBreakpointValue,
  Center,
  Stat,
  StatHelpText,
  Text,
  Flex,
  StatArrow,
  Image as ChakraImage,
} from "@chakra-ui/react";
import { boxBackgroundColor, boxBorderColor } from "./colors";
import { getRakeoffStats, icpToDollars } from "./tools";
import IcLogo from "../../assets/ic-logo.png";
import ckbtc_logo from "../../assets/ckbtc_logo.png";
import ethereum_logo from "../../assets/ethereum_logo.png";

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

      console.log(totalAmount);

      return {
        date: monthYear,
        amount: totalAmount,
      };
    });
    const formattedData = await Promise.all(dataPromises);

    // Showing several months since we dont have all the history
    const allMonths = ["Nov", "Dec", "Jan", "Feb", "Mar"];
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

  // ICP price API /////
  /////////////////

  // Storing the change in price

  const [icpPrice, setIcpPrice] = useState(0);
  // Storing the change in pentage of price in last 24 hours
  const [icpPercentChange, setIcpPercentChange] = useState(0);

  useEffect(() => {
    fetch(
      // 900 seconds = 15 mins
      "https://api.pro.coinbase.com/products/ICP-USD/candles?granularity=900"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("We gots an error");
        }
        return response.json();
      })
      .then((data) => {
        // Gets price every 15 mins, 4 intervals each hour
        const price = data[0][4];
        // Gets 4 * 24 is 96, each hour has 4 intervals
        const price24Ago = data[96][4];
        // Getting average * by 100 for percentage
        const percentageChange = ((price - price24Ago) / price24Ago) * 100;
        setIcpPrice(price);
        setIcpPercentChange(percentageChange);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  // changes to red if change less than 0, else stays green ///
  /////////////////

  const icpStrokeColor = icpPercentChange > 0 ? "#38A169" : "#E53E3E";
  const icparrowType = icpPercentChange > 0 ? "increase" : "decrease";

  // BTC price API //////
  /////////////////

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

  // ETH price API //////
  /////////////////

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
              <Heading size="md">Pool history winner amount $</Heading>
              <BarChart
                width={isDesktop ? 580 : 400}
                height={450}
                data={graphData}
                margin={{ top: 10, right: 50, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="date" />
                <YAxis />
                <Bar dataKey="amount" fill="#8a2be2" barSize={50} /> //blue
                violet either
              </BarChart>
            </Box>
          </Box>
          <Box gridArea="Githubcommits">
            <BoxLayout heading={"dApp commits: " + totalCommits}>
              <Center>
                <LineChart
                  mb={4}
                  width={isDesktop ? 680 : 415} // anything greater pushes the mobile off
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
                  arrowType={icparrowType}
                  Percentagechange={icpPercentChange.toFixed(2)}
                  market="ICP"
                />
                <Marketbox
                  StrokeColor={btcStrokeColor}
                  price={btcPrice.toFixed(0)}
                  market="ckBTC"
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
  mb,
  h,
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
          size={{ base: "sm", lg: "lg" }}
          textAlign="center"
          m={1}
          mt={3}
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

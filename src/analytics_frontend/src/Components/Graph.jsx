import React, { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, LineChart, Line } from "recharts";
import { boxBackgroundColor, boxBorderColor } from "./colors";

import { Box, Container, Heading, SimpleGrid, Center } from "@chakra-ui/react";

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
            `"AverageStaking"
            "Githubcommits"
            "Othergraph"`,
            null,
            `"AverageStaking Githubcommits"
            "AverageStaking Othergraph"`,
          ]}
        >
          <Box gridArea="AverageStaking">
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
              w={{ base: "550px", md: "400px", lg: "600px" }}
              height={530}
            >
              <Heading size="md">Average Staking Amount</Heading>
              <AreaChart
                width={500}
                height={450}
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />

                <Area
                  type="monotone"
                  dataKey="uv"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
                <Area
                  type="monotone"
                  dataKey="pv"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
                <Area
                  type="monotone"
                  dataKey="amt"
                  stackId="1"
                  stroke="#ffc658"
                  fill="#ffc658"
                />
              </AreaChart>
            </Box>
          </Box>
          <Box gridArea="Githubcommits">
            <BoxLayout>
              <Heading size="sm">dApp commits so far: {totalCommits}</Heading>

              <LineChart width={540} height={200} data={data}>
                <XAxis dataKey="name" />
                <YAxis />

                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
              </LineChart>
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

const BoxLayout = ({ children }) => {
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
      height={250}
      w={{ base: "550px", md: "400px", lg: "600px" }}
    >
      {/* <Heading size="md">{heading}</Heading> */}
      {children}
    </Box>
  );
};

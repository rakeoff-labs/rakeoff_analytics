import React, { useContext } from "react";
import {
  XAxis,
  Bar,
  YAxis,
  Line,
  ComposedChart,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, Flex, Text } from "@chakra-ui/react";
import { RakeoffContext } from "../../store/Rakeoff-context";

import { boxBackgroundColor, boxBorderColor } from "../colors";

const GitHub = () => {
  const { rakeoffStats } = useContext(RakeoffContext);

  const cleanedCommits = rakeoffStats.totalCommits.filter((item) => {
    if (item) {
      return item;
    }
  });

  const getSumOfTotalCommits = cleanedCommits.reduce((total, iter) => {
    if (iter) {
      return total + Number(iter.commits);
    }
  }, 0);

  const sortData = cleanedCommits.sort((a, b) => a.commits - b.commits);

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
            {getSumOfTotalCommits}
          </Text>
        </Flex>
        <ResponsiveContainer width={"100%"} height={200}>
          <ComposedChart data={sortData} mb={4} height={200}>
            <XAxis dataKey="name" />
            <YAxis dataKey="commits" width={56} />
            <Line type="monotone" dataKey="name" stroke="#8a2be2" />
            <Tooltip />
            <Bar dataKey="commits" fill="#8a2be2" barSize={50} />
          </ComposedChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default GitHub;

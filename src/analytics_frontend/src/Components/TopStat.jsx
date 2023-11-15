import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Container,
  Stat,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorMode,
  Image as ChakraImage,
  Flex,
  Text,
} from "@chakra-ui/react";
import { boxBackgroundColor, boxBorderColor } from "./colors";
import IcLogo from "../../assets/ic-logo.png";
import { getRakeoffStats, icpToDollars } from "./tools";

const Topstat = () => {
  const { colorMode } = useColorMode();
  const [icpStakers, setIcpStakers] = useState(0);
  const [icpFees, setIcpFees] = useState(0);
  const [icpPrice, setIcpPrice] = useState(0);
  const [icpPercentChange, setIcpPercentChange] = useState(0);
  const [stakedAmount, setStakedAmount] = useState(0);

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
        const percetageChange = ((price - price24Ago) / price24Ago) * 100;
        setIcpPrice(price);
        setIcpPercentChange(percetageChange);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const icpStrokeColor = icpPercentChange > 0 ? "#38A169" : "#E53E3E";
  const arrowType = icpPercentChange > 0 ? "increase" : "decrease";

  const fetchStats = async () => {
    const stat = await getRakeoffStats();

    setIcpFees(await icpToDollars(Number(stat.fees_collected)));
    setIcpStakers(stat.total_stakers);
    setStakedAmount(await icpToDollars(stat.total_staked));
  };

  useEffect(() => {
    fetchStats();
  });

  return (
    <Container maxW="7xl" mt={{ base: 3, md: 1 }} p={0}>
      <SimpleGrid
        gap={3}
        columns={[2, 2, 4]}
        spacing={{ base: 3, md: 8 }}
        mx={{ base: 3, md: 3, lg: 0 }}
      >
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
          p={6}
          w={{ base: "100%", md: "400px", lg: "100%" }}
        >
          <Flex>
            <ChakraImage
              src={IcLogo}
              alt="ICP logo"
              bg={colorMode === "light" ? "#edf2f6" : "white"}
              borderRadius="full"
              p={0.5}
              h={"22px"}
              w={"auto"}
            />
            &nbsp;
            <Text color="gray.500">$ICP</Text>
          </Flex>
          <Stat>
            <Heading size="lg" textAlign="center" m={3} mb={3} color="white">
              ${icpPrice}
            </Heading>

            <StatHelpText color={icpStrokeColor}>
              <StatArrow type={arrowType} />
              {icpPercentChange.toFixed(2)}%
            </StatHelpText>
          </Stat>
        </Box>

        <StoryBoxAndImage heading={icpFees} info="Fees collected" />
        <StoryBoxAndImage heading={icpStakers} info="Total stakers" />
        <StoryBoxAndImage heading={stakedAmount} info="Staked amount" />
      </SimpleGrid>
    </Container>
  );
};
export default Topstat;

export const StoryBoxAndImage = ({ heading, info }) => {
  return (
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
      p={6}
      w="100%"
    >
      <Heading size="lg" textAlign="center" m={3} mb={3} color="white">
        {heading}
      </Heading>

      <Stat>
        <StatNumber> {info}</StatNumber>
      </Stat>
    </Box>
  );
};

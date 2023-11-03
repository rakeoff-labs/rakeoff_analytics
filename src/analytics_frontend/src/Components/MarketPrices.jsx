import React, { useEffect, useState } from "react";
import { Box, Container, Text } from "@chakra-ui/react";

const MarketPrices = () => {
  const [icpPrice, setIcpPrice] = useState(null);

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
        setIcpPrice(price);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <Container maxW="7xl" mt={{ base: 12 }} p={0}>
      <Box>
        <Text>ICP price:$ {icpPrice}</Text>
      </Box>
    </Container>
  );
};

export default MarketPrices;

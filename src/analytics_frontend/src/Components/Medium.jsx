import React from "react";
import { Heading, Center, Container } from "@chakra-ui/react";

export default function Medium() {
  return (
    <Container maxW="7xl" mt={{ base: 5, md: 5 }} p={0}>
      <Center mb={8}>
        <Heading size={{ base: "xl", md: "xl" }} color="white">
          Read our blog
        </Heading>
      </Center>
      <iframe
        allowtransparency="true"
        src="https://widgets.sociablekit.com/medium-publication-feed/iframe/219005"
        allowFullScreen
        width="100%"
        height="326px"
      ></iframe>
    </Container>
  );
}

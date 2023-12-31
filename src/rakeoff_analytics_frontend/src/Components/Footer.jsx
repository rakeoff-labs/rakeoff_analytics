import React from "react";
import {
  Box,
  Container,
  Stack,
  useColorModeValue,
  Image as ChakraImage,
  Flex,
} from "@chakra-ui/react";
import logowhitepurple from "../../assets/rakeoff_logo_name_white_purple.svg";
import githubwhite from "../../assets/github_white.png";
import twitterwhite from "../../assets/twitter_white.png";
import discordwhite from "../../assets/discord_white.png";
import mediumwhite from "../../assets/medium_white.png";
import { Icon } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Container maxW="7xl" mt={{ base: 12, md: 12 }} p={0}>
      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
        mt={{ base: 3, md: 1 }}
      >
        <Container
          as={Stack}
          maxW={"7xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Flex align="center">
            <ChakraImage
              alt="rakeoff logo"
              w="auto"
              h={35}
              objectFit="contain"
              src={logowhitepurple}
            />
            <Box ml={2} color="white" fontSize="md">
              crew@rakeoff.io
            </Box>
          </Flex>
          <Stack
            direction="row"
            spacing={6}
            justify="center"
            align="center"
            mt={4}
          >
            <a href="https://twitter.com/rakeoff_app" target="_blank">
              <Icon
                as={ChakraImage}
                alt="twitter link"
                objectFit="contain"
                src={twitterwhite}
                _hover={{ opacity: 0.8 }}
                w={6}
                h={6}
              />
            </a>
            <a href="https://discord.gg/5jRHUYnsrM" target="_blank">
              <Icon
                as={ChakraImage}
                alt="discord link"
                objectFit="contain"
                src={discordwhite}
                w={8}
                h={6}
                _hover={{ opacity: 0.8 }}
              />
            </a>
            <a
              href="https://rakeoff.medium.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                as={ChakraImage}
                alt="medium link"
                objectFit="contain"
                src={mediumwhite}
                _hover={{ opacity: 0.8 }}
                h={6}
                w={8}
              />
            </a>

            <a href="https://github.com/rakeoff-labs" target="_blank">
              <Icon
                as={ChakraImage}
                alt="github link"
                objectFit="contain"
                src={githubwhite}
                _hover={{ opacity: 0.8 }}
                w={6}
                h={6}
              />
            </a>
          </Stack>
        </Container>
      </Box>
    </Container>
  );
};

export default Footer;

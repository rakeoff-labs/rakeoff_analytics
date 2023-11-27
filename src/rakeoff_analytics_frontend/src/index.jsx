import { createRoot } from "react-dom/client";
import App from "./App";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { mainBackgroundColor } from "./Components/colors";

const container = document.getElementById("app");
const root = createRoot(container);

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: mainBackgroundColor,
      },
    },
  },
});

root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);

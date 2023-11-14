import { createRoot } from "react-dom/client";
import App from "./App";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import React from "react";
const container = document.getElementById("app");
const root = createRoot(container);
export const boxBackgroundColor = "#292e40";
const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bgGradient: `linear(to-b, ${boxBackgroundColor}, purple.500, #6229a8)`,
      },
    },
  },
});

root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);

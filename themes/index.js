import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/react";

// Components
import Card from "./card";

const customTheme = {
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  styles: {
    global: (props) => ({
      body: {
        // light / dark
        bg: mode("#F6F5FA", "#312E38")(props),
      },
    }),
  },
  config: {
    useSystemColorMode: false,
    initialColorMode: "light",
  },
  components: {
    Card,
  },
};

export const theme = extendTheme(customTheme);

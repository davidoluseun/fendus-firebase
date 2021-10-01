import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "520px",
  md: "768px",
  lg: "920px",
  xl: "1200px",
});

const styles = {
  global: () => ({
    body: {
      bg: "#f0f2f5",
      fontSize: "18px",
      color: "#000",
    },
    a: {
      _focus: {
        boxShadow: "0 0 0 2px #000 !important",
      },
    },
  }),
};

const theme = extendTheme({
  breakpoints,
  styles,
  colors: {
    primary: "#da0b2f",
    secondary: "#0f3460",
    bg: "#f0f2f5",
    link: "#007bff",
    error: "#d40505",
    darkBorder: "rgba(0, 0, 0, .3)",
  },
});

export default theme;

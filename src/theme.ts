import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// Configure theme with color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// Define custom colors for our theme
const colors = {
  brand: {
    50: "#E6F5FF",
    100: "#CCE7FF",
    200: "#99CEFF",
    300: "#66B5FF",
    400: "#339CFF",
    500: "#0084FF", // Primary blue
    600: "#0066CC",
    700: "#004D99",
    800: "#003366",
    900: "#001A33",
  },
  fbDarkBg: {
    50: "#3A3B3C",
    100: "#303031", 
    200: "#242526", // Facebook-like dark mode bg
    300: "#18191A", // Facebook-like darker bg
    400: "#121212", 
    500: "#000000", // Black
  },
  lightBlue: {
    50: "#E3F2FD",  // Light blue for navigation bar in light mode
  },
  customBlue: {
    500: "#1976D2",  // Bold blue for active icons in light mode
  },
  softGray: {
    50: "#F5F5F5",  // Soft gray for search bar in light mode
  }
};

// Define styles for specific components
const components = {
  Button: {
    baseStyle: {
      fontWeight: "500",
      borderRadius: "md",
      _focus: {
        boxShadow: "outline",
      },
    },
    variants: {
      solid: (props: any) => ({
        bg: "brand.500",
        color: "white",
        _hover: {
          bg: props.colorMode === "dark" ? "brand.400" : "brand.600",
        },
      }),
      outline: (props: any) => ({
        border: "1px solid",
        borderColor: props.colorMode === "dark" ? "brand.400" : "brand.500",
        color: props.colorMode === "dark" ? "white" : "brand.500",
        _hover: {
          bg: props.colorMode === "dark" ? "rgba(0, 132, 255, 0.1)" : "brand.50",
        },
      }),
    },
  },
  IconButton: {
    baseStyle: {
      _hover: {
        transform: "scale(1.1)",
      },
      _active: {
        transform: "scale(0.95)",
      },
    },
  },
  Card: {
    baseStyle: (props: any) => ({
      bg: props.colorMode === "dark" ? "fbDarkBg.200" : "white",
      boxShadow: "md",
      borderRadius: "lg",
    }),
  },
  Link: {
    baseStyle: (props: any) => ({
      color: props.colorMode === "dark" ? "white" : "brand.500",
      _hover: {
        textDecoration: "none",
        color: props.colorMode === "dark" ? "brand.300" : "brand.600",
      },
    }),
  },
  Heading: {
    baseStyle: (props: any) => ({
      color: props.colorMode === "dark" ? "white" : "gray.800",
    }),
  },
  Text: {
    baseStyle: (props: any) => ({
      color: props.colorMode === "dark" ? "white" : "gray.800",
    }),
    variants: {
      secondary: (props: any) => ({
        color: props.colorMode === "dark" ? "whiteAlpha.700" : "gray.600",
      }),
    },
  },
};

// Create global styles
const styles = {
  global: (props: any) => ({
    html: {
      bg: props.colorMode === "dark" ? "fbDarkBg.300" : "white",
    },
    body: {
      bg: props.colorMode === "dark" ? "fbDarkBg.300" : "white",
      color: props.colorMode === "dark" ? "white" : "gray.800",
    },
    "#root, .chakra-container, .chakra-stack": {
      bg: props.colorMode === "dark" ? "fbDarkBg.300" : "inherit",
    },
    ".video-card": {
      bg: props.colorMode === "dark" ? "fbDarkBg.200" : "white",
      boxShadow: "md",
      transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
      _hover: {
        transform: "translateY(-2px)",
        boxShadow: "lg",
      },
    },
    ".interactive-icon": {
      transition: "all 0.2s ease-in-out",
    },
    ".stat-counter": {
      color: props.colorMode === "dark" ? "whiteAlpha.800" : "gray.600",
      transition: "color 0.2s ease",
    },
    // Navbar styles
    ".nav-container": {
      bg: props.colorMode === "dark" ? "fbDarkBg.200" : "lightBlue.50",
      backdropFilter: "blur(10px)",
      boxShadow: props.colorMode === "dark" 
        ? "0 -1px 10px rgba(0, 0, 0, 0.3)" 
        : "0 -1px 6px rgba(0, 0, 0, 0.1)",
    },
    ".active-nav-item": {
      color: props.colorMode === "dark" ? "brand.500" : "customBlue.500",
    },
    ".active-indicator": {
      bg: props.colorMode === "dark" ? "brand.500" : "customBlue.500",
    },
  }),
};

// Extend the theme
const theme = extendTheme({
  config,
  colors,
  components,
  styles,
  fonts: {
    heading: "Inter, system-ui, sans-serif",
    body: "Inter, system-ui, sans-serif",
  },
});

export default theme; 

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import RecoilStateInitializer from "../AppWrapper";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#008080",
    },
    secondary: {
      main: "#fff",
    },
    error: {
      main: "#F55353",
    },
    background: {
      paper: "#333",
    },
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#008080",
    },
    secondary: {
      main: "#000",
    },
    error: {
      main: "#F55353",
    },
    background: {
      paper: "white",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  return (
    <RecoilRoot>
      <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
        <RecoilStateInitializer />
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default MyApp;

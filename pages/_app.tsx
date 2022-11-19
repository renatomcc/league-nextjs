import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import AppContainer from "../components/AppContainer";
import { AnimatePresence } from "framer-motion";
import "../styles/index.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "light" }}
    >
      <AnimatePresence mode="wait">
        <AppContainer>
          <Component {...pageProps} />
        </AppContainer>
      </AnimatePresence>
    </MantineProvider>
  );
}

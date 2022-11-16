import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import AppContainer from "../components/AppContainer";
import "../styles/index.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "light" }}
    >
      <AppContainer>
        <Component {...pageProps} />
      </AppContainer>
    </MantineProvider>
  );
}

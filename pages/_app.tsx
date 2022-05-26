import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as StoreProvider } from "react-redux";
import store from "../redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={store}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </StoreProvider>
  );
}

export default MyApp;

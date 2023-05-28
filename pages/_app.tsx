"use client";
import type { AppProps } from "next/app";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Layout from "app/layout";
import Header from "components/header";

import "../styles/global.css";
import { ConfigProvider } from "antd";
import ANT_THEME_CUSTOMIZATION from "styles/AntDCustom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Number.POSITIVE_INFINITY,
      retry: 0,
      staleTime: Number.POSITIVE_INFINITY,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={ANT_THEME_CUSTOMIZATION}>
      <QueryClientProvider client={queryClient}>
        <Hydrate>
          <Header />
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default MyApp;

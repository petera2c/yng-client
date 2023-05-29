"use client";

import { ConfigProvider } from "antd";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Nunito } from "next/font/google";

import ANT_THEME_CUSTOMIZATION from "@/styles/AntDCustom";
import Header from "@/components/Header";

import "../styles/global.css";
import Head from "next/head";
import { RootStyleRegistry } from "@/components/RootStyleRegistry";

const nunito = Nunito({ subsets: ["latin"] });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Number.POSITIVE_INFINITY,
      retry: 0,
      staleTime: Number.POSITIVE_INFINITY,
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={"true"}
        />
      </Head>
      <body className={nunito.className}>
        <RootStyleRegistry>
          <ConfigProvider theme={ANT_THEME_CUSTOMIZATION}>
            <QueryClientProvider client={queryClient}>
              <Hydrate>
                <Header />
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
              </Hydrate>
            </QueryClientProvider>
          </ConfigProvider>
        </RootStyleRegistry>
      </body>
    </html>
  );
}

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";

const Home: NextPage = () => {
  return (
    <>
      <Script
        id="gtag-1"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script id="gtag-2" strategy="lazyOnload">
        {`
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
           gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
           page_path: window.location.pathname,
           });
       `}
      </Script>

      <Head>
        <title>Playing around with stock APIs</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />

        <link
          rel="preload"
          href="https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap"
          as="style"
          onload="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css?family=Nunito+Sans&display=swap"
            rel="stylesheet"
            type="text/css"
          />
        </noscript>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Festive&family=Square+Peg&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main
        className="flex flex-col items-center justify-center gap-6 bg-gradient-to-b from-fuchsia-700"
        style={{ minHeight: "100vh" }}
      >
        <h1 className="text-white text-6xl">
          Playing around with some stock APIs
        </h1>
        <h4 className="text-white text-2xl">
          Might build some SVG graphs and some sorting for a variety of tickers.
        </h4>
      </main>

      <footer></footer>
    </>
  );
};

export default Home;

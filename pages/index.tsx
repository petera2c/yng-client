import Script from "next/script";

import Page from "../components/containers/page";

const Home = () => {
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
      <Page className="flex flex-col items-center justify-center" title="Home">
        <div className="flex flex-col gap-6 max-w-screen-lg">
          <h1 className="text-center">Side Project built on AWS</h1>
          <h4 className="text-center">
            Front-end is built with Next JS, React and Tailwind. Back-end can be
            found here:{" "}
            <a
              href="https://api.peteryng.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              https://api.peteryng.com/
            </a>{" "}
            and is built with Node, Express JS and MongoDB.
          </h4>
        </div>
      </Page>
    </>
  );
};

export default Home;

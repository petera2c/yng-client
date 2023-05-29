"use client";

import Page from "../components/containers/page";

const Home = () => {
  return (
    <Page className="flex flex-col items-center justify-center" title="Home">
      <div
        className="flex flex-col items-center gap-2 max-w-screen-lg mb-64"
        style={{ marginTop: "18vh" }}
      >
        <h1 className="text-center text-6xl">
          The best way to search the stock market
        </h1>
        <h4 className="text-center">
          Search and order stocks by growth or a variety of other attributes
        </h4>
      </div>
    </Page>
  );
};

export default Home;

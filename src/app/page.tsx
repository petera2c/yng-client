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
          Unlock Financial Insights
          <br />
          with FinSearch!
        </h1>
        <h4 className="text-center w-8/12">
          Effortlessly discover and invest in stocks with strong growth
          potential using advanced search and filtering
        </h4>
      </div>
    </Page>
  );
};

export default Home;

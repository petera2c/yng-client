import Page from "../components/containers/page";

const Home = () => {
  return (
    <Page
      className="flex flex-col items-center justify-center gap-6 bg-gradient-to-b from-fuchsia-700"
      title="Home"
    >
      <h1 className="text-white text-6xl">
        Playing around with some stock APIs
      </h1>
      <h4 className="text-white text-2xl">
        Might build some SVG graphs and some sorting for a variety of tickers.
      </h4>
    </Page>
  );
};

export default Home;

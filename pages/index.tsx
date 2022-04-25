import Page from "../components/containers/page";

const Home = () => {
  return (
    <Page
      className="flex flex-col items-center justify-center gap-6 bg-gradient-to-b from-fuchsia-700"
      title="Home"
    >
      <h1 className="text-white text-6xl text-center">
        Playing around with some stock APIs
      </h1>
      <h4 className="text-white text-2xl text-center">
        Might build some D3 graphs/charts for fun and some complex sorting on a
        variety of different information for stocks
      </h4>
    </Page>
  );
};

export default Home;

import Page from "../components/containers/page";

const Home = () => {
  return (
    <Page
      className="flex flex-col items-center justify-center bg-gradient-to-b from-fuchsia-700"
      title="Home"
    >
      <div className="flex flex-col gap-6 max-w-screen-lg">
        <h1 className="text-white text-center">Side Project built on AWS</h1>
        <h4 className="text-white text-center">
          Front end is built with Next JS, React and Tailwind. Back-end can be
          found here:{" "}
          <a href="https://api.peteryng.com/" target="_blank">
            https://api.peteryng.com/
          </a>{" "}
          and is built with Node, Express JS and MongoDB.
        </h4>
      </div>
    </Page>
  );
};

export default Home;

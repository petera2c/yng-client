"use client";

import { Button } from "antd";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="flex flex-col items-center gap-8"
        style={{ marginTop: "18vh" }}
      >
        <div className="flex flex-col items-center gap-2">
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

        <Link href="/build-your-own">
          <Button size="large" type="primary">
            Use app
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

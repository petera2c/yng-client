import React from "react";
import { useRouter } from "next/router";
import Page from "components/containers/page";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const test = () => {
  const router = useRouter();
  const { ticker } = router.query;

  const { data } = useQuery([ticker], () => {
    axios.get(`companies/${ticker}`);
  });

  console.log(data);

  return (
    <Page title="">
      <div>{ticker}</div>
    </Page>
  );
};

export default test;

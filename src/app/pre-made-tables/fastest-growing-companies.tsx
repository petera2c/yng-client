"use client";

import React from "react";
import axios from "axios";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import Page from "../../components/containers/page";
import { API_URL } from "../../misc/consts";
import Company from "../../types/Company";

const FastestGrowingCompanies = () => {
  const { data } = useQuery(["fastest-growing-companies"], () =>
    axios.get(`${API_URL}/fastest-growing-companies`)
  );

  return (
    <Page title="Fastest growing companies">
      <div className="flex flex-col items-center justify-center gap-12">
        <h1 className="text-center mt-6">
          Fastest growing companies of {moment().year()}
        </h1>
        <div className="grid grid-cols-2 gap-2">
          {data?.data.map((company: Company, index: number) => (
            <div className="contents" key={index}>
              <div>{company.ticker}</div>
              <div className="text-right">{company.ratio}</div>
              {index !== data.data.length - 1 && (
                <div className="col-span-2 h-px bg-blue-100" />
              )}
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
};

export default FastestGrowingCompanies;

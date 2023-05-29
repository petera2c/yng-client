"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../../misc/consts";
import Page from "../../../components/containers/page";
const CompanyInfo = () => {
  const router = useRouter();
  const ticker = "router.query";

  const stockData = useQuery([ticker], async () => {
    if (ticker) return (await axios.get(`${API_URL}/companies/${ticker}`)).data;
  }).data;

  const quarterlysData = useQuery([ticker], async () => {
    if (ticker)
      return (await axios.get(`${API_URL}/quarterlys/${ticker}`)).data;
  }).data;

  if (!stockData) return <></>;

  return (
    <Page className="items-center" title="">
      <div className="container max-w-xl flex flex-col gap-4">
        <h1 className="text-center">
          {stockData.company_name} ({ticker})
        </h1>
        <p>{stockData.description}</p>

        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <div>P/E ratio: {stockData.pe_ratio}</div>
            <div>P/E(fwd) ratio: {stockData.fwd_pe_ratio}</div>
            <div>P/S ratio: {stockData.ps_ratio}</div>
          </div>
          <div className="flex flex-col gap-2">
            <div>Country: {stockData.country}</div>
            <div>Is ETF: {stockData.is_etf}</div>
            <div>Industry: {stockData.industry}</div>
            <div>Exchange: {stockData.exchange_short_name}</div>
          </div>
        </div>
        {stockData.website && <div>Visit website</div>}
      </div>
    </Page>
  );
};

export default CompanyInfo;

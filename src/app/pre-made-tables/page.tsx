"use client";

import React from "react";
import Link from "next/link";
import "./styles.css";

const TABLE_ROUTE_LIST = [
  {
    label: `Fastest growing companies during 2008 recession`,
    pathname: "/pre-made-tables/fastest-growing-companies",
  },
  {
    label: `Most profitable companies during the pandemic`,
    pathname: "/pre-made-tables",
  },
];

const PremadeTables = () => {
  return (
    <div className="flex flex-col align-center p-8" title="Pre-made tables">
      <div className="flex flex-wrap justify-center gap-8 p-8">
        {TABLE_ROUTE_LIST.map((tableRoute, index) => (
          <TableRouteButton
            key={index}
            label={tableRoute.label}
            pathname={tableRoute.pathname}
          />
        ))}
      </div>
    </div>
  );
};

const TableRouteButton = ({
  label,
  pathname,
}: {
  label: string;
  pathname: string;
}) => {
  return (
    <Link className="text-decoration-none" href={pathname}>
      <div className="blog-card p-2 rounded">
        <img className="w-12/12" src="/test-img.png" />
        <p className="text-center">{label}</p>
      </div>
    </Link>
  );
};

export default PremadeTables;

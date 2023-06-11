"use client";

import React from "react";
import Link from "next/link";
import moment from "moment";
import { Button } from "antd";

const TABLE_ROUTE_LIST = [
  {
    label: `Fastest Growing companies of ${moment().year()}`,
    pathname: "/pre-made-tables/fastest-growing-companies",
  },
  {
    label: `Fastest Growing dividends of ${moment().year()}`,
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
    <Link href={pathname}>
      <Button>{label}</Button>
    </Link>
  );
};

export default PremadeTables;

import React from "react";
import Link from "next/link";
import moment from "moment";

import Page from "components/containers/page";

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
    <Page className="flex flex-col align-center p-8" title="Pre-made tables">
      <div className="flex flex-wrap justify-center gap-8 p-8">
        {TABLE_ROUTE_LIST.map((tableRoute, index) => (
          <TableRouteButton
            label={tableRoute.label}
            pathname={tableRoute.pathname}
          />
        ))}
      </div>
    </Page>
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
      <button className="button-cover cursor-pointer rounded shadow-md p-8">
        {label}
      </button>
    </Link>
  );
};

export default PremadeTables;

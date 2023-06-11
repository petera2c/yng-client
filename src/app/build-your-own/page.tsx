"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import moment from "moment";
import { capitalize, startCase } from "lodash";
import { Button, Select } from "antd";
import {
  API_URL,
  QUARTERLY_FILTER_ATTRIBUTES,
  QUARTERLY_OPTIONS,
} from "../../misc/consts";
import Company from "../../types/Company";

import { isNumeric } from "../../misc/util";

const STOCKS_START_YEAR = 1980;

const snakeToSpace = (str: string) => str.replaceAll("_", " ");

const createStockYearArray = () => {
  let temp = [];
  for (let i = STOCKS_START_YEAR; i <= moment().year(); i++) {
    temp.unshift({ label: String(i), value: String(i) });
  }
  return temp;
};
const createOrderByOptions = (filters: Filter[]) => [
  ...filters.map((filter: Filter) => ({
    label: filter.attribute,
    value: filter.attribute,
  })),
];
const STOCK_YEAR_ARRAY = createStockYearArray();

type Filter = {
  attribute: string;
  fromYear: string;
  fromQuarterly: string;
  toYear: string;
  toQuarterly: string;
};

const App = () => {
  const [filters, setFilters] = useState<Filter[]>([]);

  const [editingAttributeIndex, setEditingAttributeIndex] = useState(
    QUARTERLY_FILTER_ATTRIBUTES[0].value
  );
  const [editingFromYearIndex, setEditingFromYearIndex] = useState(
    STOCK_YEAR_ARRAY[4].value
  );
  const [editingFromQuarterlyIndex, setEditingFromQuarterlyIndex] = useState(
    QUARTERLY_OPTIONS[0].value
  );
  const [editingToYearIndex, setEditingToYearIndex] = useState(
    STOCK_YEAR_ARRAY[0].value
  );
  const [editingToQuarterlyIndex, setEditingToQuarterlyIndex] = useState(
    QUARTERLY_OPTIONS[0].value
  );

  const orderByOptions = useMemo(() => {
    return createOrderByOptions(filters);
  }, [filters]);

  const [orderBy, setOrderBy] = useState<string>();

  const resetEditingFilter = () => {
    setEditingAttributeIndex(QUARTERLY_FILTER_ATTRIBUTES[0].value);
    setEditingFromYearIndex(STOCK_YEAR_ARRAY[4].value);
    setEditingFromQuarterlyIndex(QUARTERLY_OPTIONS[0].value);
    setEditingToYearIndex(STOCK_YEAR_ARRAY[0].value);
    setEditingToQuarterlyIndex(QUARTERLY_OPTIONS[0].value);
  };

  const search = (filters: Filter[], orderBy: any) =>
    axios.post(`${API_URL}/make-your-own`, {
      filters: filters.map((filter) => ({
        attribute: filter.attribute,
        fromYear: filter.fromYear,
        fromQuarterly: filter.fromQuarterly,
        toYear: filter.toYear,
        toQuarterly: filter.toQuarterly,
      })),
      orderBy: orderBy.value,
    });

  const { data } = useQuery([...filters, orderBy], () => {
    if (filters.length > 0) return search(filters, orderBy);
    else return undefined;
  });

  useEffect(() => {
    if (!orderBy && orderByOptions[0]) setOrderBy(orderByOptions[0].value);
  }, [orderBy, orderByOptions[0]]);

  return (
    <div className="flex flex-col items-center grow">
      <div className="flex grow gap-8" style={{ width: "1200px" }}>
        <div
          className="flex flex-col items-end gap-4"
          style={{ minWidth: "300px" }}
        >
          <div className="flex flex-col w-12/12 gap-3">
            <Select
              onChange={setEditingAttributeIndex}
              options={QUARTERLY_FILTER_ATTRIBUTES.map(
                (quarterlyFilterAttribute) => ({
                  label: capitalize(
                    snakeToSpace(quarterlyFilterAttribute.value)
                  ),
                  value: quarterlyFilterAttribute.value,
                })
              )}
              value={editingAttributeIndex}
            />
            <div className="flex justify-between gap-2">
              <Select
                onChange={setEditingFromYearIndex}
                options={STOCK_YEAR_ARRAY}
                value={editingFromYearIndex}
              />
              <Select
                onChange={setEditingToYearIndex}
                options={STOCK_YEAR_ARRAY}
                value={editingToYearIndex}
              />
            </div>
            <div className="flex justify-between gap-2">
              <Select
                onChange={setEditingFromQuarterlyIndex}
                options={QUARTERLY_OPTIONS}
                value={editingFromQuarterlyIndex}
              />
              <Select
                onChange={setEditingToQuarterlyIndex}
                options={QUARTERLY_OPTIONS}
                value={editingToQuarterlyIndex}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setFilters((filters: Filter[]) => {
                  filters = [...filters];
                  filters.push({
                    attribute: editingAttributeIndex,
                    fromYear: editingFromYearIndex,
                    fromQuarterly: editingFromQuarterlyIndex,
                    toYear: editingToYearIndex,
                    toQuarterly: editingToQuarterlyIndex,
                  });
                  return filters;
                });
                resetEditingFilter();
              }}
              type="primary"
            >
              Save filter
            </Button>
          </div>
        </div>
        <div style={{ background: "rgba(5, 5, 5, 0.12)", width: "1px" }} />

        <div className="flex items-start grow">
          <div
            className="grid grow gap-1"
            style={{
              gridTemplateColumns: "1fr 1fr auto",
            }}
          >
            <div
              className="flex items-center gap-2 pb-4"
              style={{ gridColumn: "1/4" }}
            >
              Order by:
              {orderByOptions.length > 0 && (
                <Select
                  onChange={setOrderBy}
                  options={orderByOptions}
                  style={{ minWidth: "200px" }}
                  value={orderBy}
                />
              )}
            </div>
            <div className="text-xl">Attribute</div>
            <div className="text-xl">Period</div>
            <div />

            {filters.length > 0 &&
              filters.map((filter: Filter, index: number) => {
                return (
                  <div className="contents" key={index}>
                    <div className="flex items-center whitespace-nowrap">
                      {capitalize(snakeToSpace(filter.attribute))}
                    </div>
                    <div className="flex items-center whitespace-nowrap">
                      {capitalize(snakeToSpace(filter.fromQuarterly))}{" "}
                      {capitalize(snakeToSpace(filter.fromYear))} -{" "}
                      {capitalize(snakeToSpace(filter.toQuarterly))}{" "}
                      {capitalize(snakeToSpace(filter.toYear))}
                    </div>
                    <Button
                      className="flex justify-center"
                      onClick={() => {
                        setFilters((filters: Filter[]) => {
                          filters = [...filters];
                          filters.splice(index, 1);

                          return filters;
                        });
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                );
              })}
          </div>

          <div className="container max-w-3xl flex flex-col items-start gap-6">
            <div className="grid auto-cols-min gap-4 mt-4">
              {data?.data.map((company: Company, index: number) => (
                <div key={index} className="contents">
                  {index === 0 &&
                    Object.keys(company).map((columnName, index) => (
                      <div
                        className={`border-b-2 border-gray-300 whitespace-nowrap font-bold text-xl ${
                          isNumeric(company[columnName]) && "text-right"
                        } pb-1 `}
                        key={index}
                        style={{ gridColumn: index + 1 }}
                      >
                        {capitalize(startCase(columnName).toLocaleLowerCase())}
                      </div>
                    ))}
                  {Object.keys(company).map((columnName, index) => {
                    /* if (columnName === "ticker")
                  return (
                    <div className="flex items-start" key={index}>
                      <Link href={"/company/" + company[columnName]}>
                        <Button
                          className="button-link"
                          style={{ gridColumn: index + 1 }}
                        >
                          {company[columnName]}
                        </Button>
                      </Link>
                    </div>
                  );*/
                    if (isNumeric(company[columnName]))
                      return (
                        <div
                          className="text-right"
                          key={index}
                          style={{ gridColumn: index + 1 }}
                        >
                          {Math.round(
                            company[columnName] * 100
                          ).toLocaleString()}
                          %
                        </div>
                      );
                    else
                      return (
                        <div key={index} style={{ gridColumn: index + 1 }}>
                          {company[columnName]}
                        </div>
                      );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;

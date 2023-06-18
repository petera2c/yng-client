"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import moment from "moment";
import { Button, Input, Select, message } from "antd";
import {
  COMPANY_GROWTH_FIELD,
  COMPANY_SYMBOL_FIELD,
  OPERATORS,
  QUARTERLY_FILTER_ATTRIBUTES,
  QUARTERLY_OPTIONS,
} from "../../misc/consts";

import {
  capitalize,
  formatCurrency,
  isNumeric,
  snakeToSpaces,
} from "../../misc/util";
import { CloseCircleOutlined, CloseOutlined } from "@ant-design/icons";
import Filter from "@/types/Filter";
import { companiesSearch } from "./util";
import Company from "@/types/Company";
import { cloneDeep } from "lodash";

const STOCKS_START_YEAR = 1980;

const snakeToSpace = (str: string) => str.replaceAll("_", " ");

const createStockYearArray = () => {
  let temp = [];
  for (let i = STOCKS_START_YEAR; i <= moment().year(); i++) {
    temp.unshift({ label: String(i), value: String(i) });
  }
  return temp;
};

const STOCK_YEAR_ARRAY = createStockYearArray();

const App = () => {
  // Local state
  const [filters, setFilters] = useState<Filter[]>([]);
  const [attribute, setAttribute] = useState(QUARTERLY_FILTER_ATTRIBUTES[0]);
  const [comparisonOperator, setComparisonOperator] = useState<">" | "<" | "=">(
    ">"
  );
  const [amount, setAmount] = useState(0);

  const [fromYear, setFromYear] = useState(STOCK_YEAR_ARRAY[4].value);
  const [fromQuarterly, setFromQuarterly] = useState(
    QUARTERLY_OPTIONS[0].value
  );
  const [toYear, setToYear] = useState(STOCK_YEAR_ARRAY[0].value);
  const [toQuarterly, setToQuarterly] = useState(QUARTERLY_OPTIONS[0].value);

  const [orderBy, setOrderBy] = useState<string>("revenue");

  const [data, setData] = useState<Company[]>();

  // Derived state
  const availableQuarterlyFilterAttributes = QUARTERLY_FILTER_ATTRIBUTES.filter(
    (attribute) =>
      !filters.find((filter) => filter.attribute === attribute.value)
  );

  // Handlers
  // const abc = async () => {
  //   const test = await companiesSearch(
  //     filters,
  //     fromQuarterly,
  //     fromYear,
  //     toQuarterly,
  //     toYear,
  //     orderBy
  //   );
  // };
  // abc();

  // Queries
  // const { data, isLoading, error } = useQuery(
  //   [fromYear, fromQuarterly, toYear, toQuarterly, orderBy, filters],
  //   async () => {
  //     if (fromQuarterly && toQuarterly && fromYear && toYear && orderBy) {
  //       const test = await companiesSearch(
  //         filters,
  //         fromQuarterly,
  //         fromYear,
  //         toQuarterly,
  //         toYear,
  //         orderBy
  //       );

  //       return test;
  //     } else return [];
  //   }
  // );

  useEffect(() => {
    const getCompanies = async () => {
      if (fromQuarterly && toQuarterly && fromYear && toYear && orderBy) {
        const data = await companiesSearch(
          filters,
          fromQuarterly,
          fromYear,
          toQuarterly,
          toYear,
          orderBy
        );

        setData(data);
      } else return [];
    };

    getCompanies();
  }, [fromYear, fromQuarterly, toYear, toQuarterly, orderBy, filters]);

  return (
    <div className="flex grow overflow-hidden">
      <div className="flex grow overflow-hidden">
        <div className="flex flex-col">
          <div
            className="grid overflow-auto gap-3 pr-8"
            style={{ gridTemplateColumns: "auto 1fr 1fr", minWidth: "300px" }}
          >
            <div className="flex items-center">From:</div>

            <Select
              className="grow"
              onChange={setFromYear}
              options={STOCK_YEAR_ARRAY}
              value={fromYear}
            />
            <Select
              className="grow"
              onChange={setToQuarterly}
              options={QUARTERLY_OPTIONS}
              value={toQuarterly}
            />
            <div className="flex items-center">To:</div>
            <Select
              onChange={setToYear}
              options={STOCK_YEAR_ARRAY}
              value={toYear}
            />
            <Select
              onChange={setFromQuarterly}
              options={QUARTERLY_OPTIONS}
              value={fromQuarterly}
            />

            <div className="text-xl" style={{ gridColumn: "span 3" }}>
              Filters:
            </div>
            <Select
              onChange={(value, obj: any) => setAttribute(obj)}
              options={availableQuarterlyFilterAttributes}
              style={{
                minWidth: "240px",
                gridColumn: "span 2",
              }}
              value={attribute}
            />

            <div className="flex gap-2">
              <Select
                onChange={setComparisonOperator}
                options={OPERATORS}
                value={comparisonOperator}
              />
              <Input
                suffix="$"
                onChange={(e) => {
                  const value = e.target.value.replace(/,/g, "");

                  if (isNumeric(value)) {
                    setAmount(Number(value));
                  }
                }}
                placeholder="Amount"
                style={{
                  width: "128px",
                }}
                value={amount.toLocaleString()}
              />
            </div>
            <Button
              onClick={() => {
                if (amount === undefined || !attribute || !comparisonOperator)
                  return message.error("Please fill out all fields");

                const newFilters = [...filters];
                newFilters.push({
                  amount,
                  attribute: attribute.value,
                  comparisonOperator,
                });
                setFilters(newFilters);

                const availableQuarterlyFilterAttributes =
                  QUARTERLY_FILTER_ATTRIBUTES.filter(
                    (attribute) =>
                      !newFilters.find(
                        (filter) => filter.attribute === attribute.value
                      )
                  );

                setAttribute(availableQuarterlyFilterAttributes[0]);
                setAmount(0);
                setComparisonOperator(">");
              }}
              style={{ gridColumn: "span 3" }}
              type="primary"
            >
              Save filter
            </Button>

            {filters.map((filter: Filter, index: number) => {
              return (
                <Button
                  key={index}
                  onClick={() => {
                    setFilters((filters: Filter[]) => {
                      filters = [...filters];
                      filters.splice(index, 1);

                      return filters;
                    });
                  }}
                  style={{ gridColumn: "span 3" }}
                >
                  {capitalize(snakeToSpace(filter.attribute))}
                  <span className="px-2" style={{ color: "#0074D9" }}>
                    {filter.comparisonOperator}
                  </span>
                  {formatCurrency(filter.amount)}
                  <CloseCircleOutlined style={{ color: "red" }} rev="" />
                </Button>
              );
            })}
          </div>
        </div>

        <div style={{ background: "rgba(5, 5, 5, 0.12)", width: "1px" }} />

        <div className="flex flex-col grow overflow-hidden gap-4 pl-8">
          <div className="flex items-center gap-2">
            Order by:
            <Select
              onChange={setOrderBy}
              options={cloneDeep(QUARTERLY_FILTER_ATTRIBUTES).map(
                (quarterlyFilterAttribute) => {
                  quarterlyFilterAttribute.label += " growth";
                  return quarterlyFilterAttribute;
                }
              )}
              style={{ minWidth: "400px" }}
              value={orderBy}
            />
          </div>

          <div className="flex grow overflow-auto">
            <div className="grid gap-4">
              {data?.map((company: Company, index: number) => (
                <div key={index} className="contents">
                  {index === 0 &&
                    Object.keys(company).map((columnName, index) => {
                      let value = columnName;

                      // if (value === COMPANY_SYMBOL_FIELD) value = "company";

                      return (
                        <div
                          className="whitespace-nowrap text-xl"
                          key={index}
                          style={{ gridColumn: index + 1 }}
                        >
                          {capitalize(snakeToSpaces(value))}
                        </div>
                      );
                    })}
                  {Object.keys(company).map((columnName, index) => {
                    let value = company[columnName];

                    if (columnName === COMPANY_GROWTH_FIELD)
                      value = Math.round(value * 100) + "%";
                    else if (columnName === COMPANY_SYMBOL_FIELD) {
                    } else value = formatCurrency(value);

                    return (
                      <div key={index} style={{ gridColumn: index + 1 }}>
                        {value}
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

"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { XIcon, PlusIcon } from "@heroicons/react/solid";
import moment from "moment";
import { capitalize, startCase } from "lodash";
import { Select } from "antd";
import {
  API_URL,
  QUARTERLY_FILTER_ATTRIBUTES,
  QUARTERLY_OPTIONS,
} from "../../misc/consts";
import Page from "../../components/containers/page";
import Company from "../../types/Company";

import { isNumeric } from "../../misc/util";

const STOCKS_START_YEAR = 1980;

const createStockYearArray = () => {
  let temp = [];
  for (let i = STOCKS_START_YEAR; i <= moment().year(); i++) {
    temp.unshift({ label: String(i), value: String(i) });
  }
  return temp;
};
const createOrderByOptions = (filters: Filter[]) => [
  ...filters.map((filter: Filter) => ({
    label: filter.attribute.label,
    value: filter.attribute.value,
  })),
];
const STOCK_YEAR_ARRAY = createStockYearArray();

type Filter = {
  attribute: any;
  fromYear: any;
  fromQuarterly: any;
  toYear: any;
  toQuarterly: any;
};

const App = () => {
  const [filters, setFilters] = useState<Filter[]>([]);

  const [editingAttributeIndex, setEditingAttributeIndex] = useState(0);
  const [editingFromYearIndex, setEditingFromYearIndex] = useState(4);
  const [editingFromQuarterlyIndex, setEditingFromQuarterlyIndex] = useState(0);
  const [editingToYearIndex, setEditingToYearIndex] = useState(0);
  const [editingToQuarterlyIndex, setEditingToQuarterlyIndex] = useState(0);

  const [isEditingFilter, setIsEditingFilter] = useState(false);

  const orderByOptions = useMemo(() => {
    return createOrderByOptions(filters);
  }, [filters]);

  const [orderByIndex, setOrderByIndex] = useState(0);

  const resetEditingFilter = () => {
    setEditingAttributeIndex(0);
    setEditingFromYearIndex(5);
    setEditingFromQuarterlyIndex(0);
    setEditingToYearIndex(0);
    setEditingToQuarterlyIndex(0);
  };

  const search = (filters: Filter[], orderBy: any) =>
    axios.post(`${API_URL}/make-your-own`, {
      filters: filters.map((filter) => ({
        attribute: filter.attribute.value,
        fromYear: filter.fromYear.value,
        fromQuarterly: filter.fromQuarterly.value,
        toYear: filter.toYear.value,
        toQuarterly: filter.toQuarterly.value,
      })),
      orderBy: orderBy.value,
    });

  const { data } = useQuery([...filters, orderByOptions[orderByIndex]], () => {
    if (filters.length > 0)
      return search(filters, orderByOptions[orderByIndex]);
    else return undefined;
  });
  console.log(data);

  useEffect(() => {
    if (!orderByIndex) setOrderByIndex(0);
  }, [orderByIndex]);

  return (
    <Page className="flex flex-col items-center gap-4" title="Main app">
      <div className="container max-w-3xl flex flex-col gap-4">
        <div className="flex w-full justify-between gap-4">
          {isEditingFilter && (
            <div className="flex flex-col gap-2">
              <Select
                onChange={setEditingAttributeIndex}
                options={QUARTERLY_FILTER_ATTRIBUTES}
              />
              <div className="flex justify-between gap-2">
                <Select
                  onChange={setEditingFromYearIndex}
                  options={STOCK_YEAR_ARRAY}
                />
                <Select
                  onChange={setEditingToYearIndex}
                  options={STOCK_YEAR_ARRAY}
                />
              </div>
              <div className="flex justify-between gap-2">
                <Select
                  onChange={setEditingFromQuarterlyIndex}
                  options={QUARTERLY_OPTIONS}
                />
                <Select
                  onChange={setEditingToQuarterlyIndex}
                  options={QUARTERLY_OPTIONS}
                />
              </div>
            </div>
          )}

          <div className="col-start-8 col-end-10 flex flex-col grow items-end gap-2">
            {isEditingFilter ? (
              <div className="flex gap-2">
                <button
                  className="button-primary"
                  onClick={() => {
                    setFilters((filters: Filter[]) => {
                      filters = [...filters];
                      filters.push({
                        attribute:
                          QUARTERLY_FILTER_ATTRIBUTES[editingAttributeIndex],
                        fromYear: STOCK_YEAR_ARRAY[editingFromYearIndex],
                        fromQuarterly:
                          QUARTERLY_OPTIONS[editingFromQuarterlyIndex],
                        toYear: STOCK_YEAR_ARRAY[editingToYearIndex],
                        toQuarterly: QUARTERLY_OPTIONS[editingToQuarterlyIndex],
                      });
                      return filters;
                    });
                    resetEditingFilter();
                    setIsEditingFilter(false);
                  }}
                >
                  Save filter
                </button>
                <button
                  className="button-secondary"
                  onClick={() => setIsEditingFilter(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="button-primary"
                onClick={() => setIsEditingFilter(true)}
              >
                <PlusIcon className="h-5" />
                Add filter
              </button>
            )}

            {orderByOptions.length > 0 && (
              <Select onChange={setOrderByIndex} options={orderByOptions} />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {filters.length > 0 &&
            filters.map((filter: Filter, index: number) => {
              return (
                <div
                  key={index}
                  className="flex items-center bg-slate-200 gap-4 p-4 rounded"
                >
                  <div className="flex grow gap-4">
                    <div>{filter.attribute.label}</div>
                    <div>
                      {filter.fromYear.label}-{filter.fromQuarterly.label}
                    </div>
                    to
                    <div>
                      {filter.toYear.label}-{filter.toQuarterly.label}
                    </div>
                  </div>
                  <button
                    className="flex justify-center text-red-500"
                    onClick={() => {
                      setFilters((filters: Filter[]) => {
                        filters = [...filters];
                        filters.splice(index, 1);

                        return filters;
                      });
                    }}
                  >
                    <XIcon className="h-5" />
                  </button>
                </div>
              );
            })}
        </div>
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
                        <button
                          className="button-link"
                          style={{ gridColumn: index + 1 }}
                        >
                          {company[columnName]}
                        </button>
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
                      {Math.round(company[columnName] * 100).toLocaleString()}%
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
    </Page>
  );
};
export default App;

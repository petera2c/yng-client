import React, { useEffect, useMemo, useState } from "react";
import Page from "components/containers/page";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  API_URL,
  QUARTERLY_OPTIONS,
  QUARTERLY_FILTER_ATTRIBUTES,
  STOCK_FILTER_ATTRIBUTES,
} from "misc/consts";
import Company from "types/Company";
import { XIcon, PlusIcon } from "@heroicons/react/solid";
import Dropdown, { Option } from "components/dropdown";
import moment from "moment";
import { capitalize, startCase } from "lodash";

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
  attribute: Option;
  fromYear: Option;
  fromQuarterly: Option;
  toYear: Option;
  toQuarterly: Option;
};

const App = () => {
  const [filters, setFilters] = useState<Filter[]>([]);

  const [editingAttribute, setEditingAttribute] = useState<Option>(
    QUARTERLY_FILTER_ATTRIBUTES[0]
  );
  const [editingFromYear, setEditingFromYear] = useState<Option>(
    STOCK_YEAR_ARRAY[4]
  );
  const [editingFromQuarterly, setEditingFromQuarterly] = useState<Option>(
    QUARTERLY_OPTIONS[0]
  );
  const [editingToYear, setEditingToYear] = useState<Option>(
    STOCK_YEAR_ARRAY[0]
  );
  const [editingToQuarterly, setEditingToQuarterly] = useState<Option>(
    QUARTERLY_OPTIONS[2]
  );

  const [isEditingFilter, setIsEditingFilter] = useState(false);

  const orderByOptions = useMemo(() => {
    return createOrderByOptions(filters);
  }, [createOrderByOptions, filters]);

  const [orderBy, setOrderBy] = useState<Option>(orderByOptions[0]);

  const resetEditingFilter = () => {
    setEditingAttribute(QUARTERLY_FILTER_ATTRIBUTES[0]);
    setEditingFromYear(STOCK_YEAR_ARRAY[5]);
    setEditingFromQuarterly(QUARTERLY_OPTIONS[0]);
    setEditingToYear(STOCK_YEAR_ARRAY[0]);
    setEditingToQuarterly(QUARTERLY_OPTIONS[3]);
  };

  const search = (filters: Filter[], orderBy: Option) => {
    console.log("searching");
    return axios.post(`${API_URL}/make-your-own`, {
      filters: filters.map((filter) => ({
        attribute: filter.attribute.value,
        fromYear: filter.fromYear.value,
        fromQuarterly: filter.fromQuarterly.value,
        toYear: filter.toYear.value,
        toQuarterly: filter.toQuarterly.value,
      })),
      orderBy: orderBy.value,
    });
  };
  const { isLoading, error, data, refetch } = useQuery(["make-your-own"], () =>
    search(filters, orderBy)
  );

  useEffect(() => {
    console.log("refetching");
    refetch();
  }, [filters, orderBy]);
  useEffect(() => {
    if (!orderBy) setOrderBy(orderByOptions[0]);
  }, [orderByOptions]);

  return (
    <Page className="items-center" title="Main app">
      <div className="flex flex-col items-center justify-center max-w-7xl gap-6">
        <h1 className="text-center mt-6 mb-4">
          Query the stock market like a pro
        </h1>

        {filters.length > 0 &&
          filters.map((filter: Filter, index: number) => {
            return (
              <div key={index} className="flex bg-purple-100 rounded">
                <div className="col-start-1 p-4">{filter.attribute.label}</div>
                <div className="col-start-2 p-4">{filter.fromYear.label}</div>
                <div className="col-start-3 p-4">
                  {filter.fromQuarterly.label}
                </div>
                <div className="col-start-4 p-4">{filter.toYear.label}</div>
                <div className="col-start-5 p-4">
                  {filter.toQuarterly.label}
                </div>
                <button
                  className="flex justify-center col-start-6 p-4"
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

        <div className="flex flex-col items-end w-full gap-4">
          {isEditingFilter ? (
            <>
              <div className="flex justify-center gap-2">
                <Dropdown
                  onValueChange={setEditingAttribute}
                  options={QUARTERLY_FILTER_ATTRIBUTES}
                  title={`${editingAttribute?.label}`}
                />
                <Dropdown
                  initialIndex={4}
                  onValueChange={setEditingFromYear}
                  options={STOCK_YEAR_ARRAY}
                  title={`From year: ${editingFromYear.label}`}
                />
                <Dropdown
                  onValueChange={setEditingFromQuarterly}
                  options={QUARTERLY_OPTIONS}
                  title={`From quarterly: ${editingFromQuarterly.label}`}
                />
                <Dropdown
                  onValueChange={setEditingToYear}
                  options={STOCK_YEAR_ARRAY}
                  title={`To year: ${editingToYear.label}`}
                />
                <Dropdown
                  initialIndex={2}
                  onValueChange={setEditingToQuarterly}
                  options={QUARTERLY_OPTIONS}
                  title={`To quarterly: ${editingToQuarterly?.label}`}
                />
              </div>
              <button
                className="button-default"
                onClick={() => {
                  if (
                    editingAttribute &&
                    editingFromYear &&
                    editingFromQuarterly &&
                    editingToYear &&
                    editingToQuarterly
                  )
                    setFilters((filters: Filter[]) => {
                      filters = [...filters];
                      filters.push({
                        attribute: editingAttribute,
                        fromYear: editingFromYear,
                        fromQuarterly: editingFromQuarterly,
                        toYear: editingToYear,
                        toQuarterly: editingToQuarterly,
                      });
                      return filters;
                    });
                  resetEditingFilter();
                }}
              >
                Save filter
              </button>
            </>
          ) : (
            <button
              className="button-default"
              onClick={() => setIsEditingFilter(true)}
            >
              <PlusIcon className="h-5" />
              Add filter
            </button>
          )}
        </div>

        <div className="flex justify-end w-full">
          <Dropdown
            initialIndex={2}
            onValueChange={setEditingToQuarterly}
            options={orderByOptions}
            title={`Order by: ${orderBy?.label}`}
          />
        </div>
        <div className="grid auto-cols-min gap-4 mt-4">
          {data?.data.map((company: Company, index: number) => (
            <div key={index} className="contents">
              {index === 0 &&
                Object.keys(company).map((objIndex, index) => (
                  <div
                    className="border-b border-purple-300 whitespace-nowrap font-bold text-xl pb-1"
                    key={index}
                    style={{ gridColumn: index + 1 }}
                  >
                    {capitalize(startCase(objIndex).toLocaleLowerCase())}
                  </div>
                ))}
              {Object.keys(company).map((objIndex, index) => (
                <div key={index} style={{ gridColumn: index + 1 }}>
                  {company[objIndex]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
};
export default App;

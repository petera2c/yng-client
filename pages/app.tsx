import React, { useEffect, useMemo, useState } from "react";
import Page from "components/containers/page";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  API_URL,
  QUARTERLY_OPTIONS,
  STOCK_FILTER_ATTRIBUTES,
} from "misc/consts";
import Company from "types/Company";
import { XIcon, PlusIcon } from "@heroicons/react/solid";
import Dropdown, { Option } from "components/dropdown";
import moment from "moment";

const STOCKS_START_YEAR = 1980;

const createStockYearArray = () => {
  let temp = [];
  for (let i = STOCKS_START_YEAR; i <= moment().year(); i++) {
    temp.unshift({ label: String(i), value: String(i) });
  }
  return temp;
};
const createOrderByOptions = (filters: Filter[]) => {
  return filters.map((filter: Filter) => ({
    label: filter.attribute.label,
    value: "revenue",
  }));
};
const STOCK_YEAR_ARRAY = createStockYearArray();

type Filter = {
  attribute: Option;
  fromYear: Option;
  fromQuarterly: Option;
  toYear: Option;
  toQuarterly: Option;
};

const App = () => {
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<Filter[]>([]);

  const availableAttributes = useMemo(() => {
    return [];
  }, []);

  const [editingAttribute, setEditingAttribute] = useState<Option>(
    availableAttributes[0]
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

  const orderByOptions = useMemo(() => {
    return createOrderByOptions(filters);
  }, [createOrderByOptions, filters]);
  const [orderBy, setOrderBy] = useState<Option>(orderByOptions[0]);

  const resetEditingFilter = () => {
    setEditingAttribute(availableAttributes[0]);
    setEditingAttribute(STOCK_YEAR_ARRAY[5]);
    setEditingAttribute(QUARTERLY_OPTIONS[0]);
    setEditingAttribute(STOCK_YEAR_ARRAY[0]);
    setEditingAttribute(QUARTERLY_OPTIONS[3]);
  };

  const search = (filters: Filter[]) => {
    return axios.post(`${API_URL}/make-your-own`, {
      filters: filters.map((filter: Filter) => {
        return {
          attribute: filter.attribute.value,
          fromYear: filter.fromYear.value,
          fromQuarterly: filter.fromQuarterly.value,
          toYear: filter.toYear.value,
          toQuarterly: filter.toQuarterly.value,
        };
      }),
      orderBy: orderBy.value,
    });
  };
  const { isLoading, error, data, refetch } = useQuery(["make-your-own"], () =>
    search(filters)
  );

  useEffect(() => {
    refetch();
  }, [filters]);

  return (
    <Page className="items-center" title="Main app">
      <div className="flex flex-col items-center justify-center max-w-7xl gap-2">
        <h1 className="text-center mt-6 mb-8">
          Query the stock market like a pro
        </h1>

        <div className="flex flex-col items-end w-full gap-4">
          <>
            <div className="flex items-center gap-2">
              <Dropdown
                onValueChange={setEditingAttribute}
                options={STOCK_FILTER_ATTRIBUTES}
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
                    filters.push({
                      attribute: editingAttribute,
                      fromYear: editingFromYear,
                      fromQuarterly: editingFromQuarterly,
                      toYear: editingToYear,
                      toQuarterly: editingToQuarterly,
                    });
                    return [...filters];
                  });
                resetEditingFilter();
              }}
            >
              <PlusIcon className="h-5" />
              Save filter
            </button>
          </>
        </div>

        {filters.length > 0 && (
          <>
            <div className="flex justify-between items-end w-full">
              <div className="flex flex-col gap-4">
                {filters.map((filter: Filter, index: number) => {
                  return (
                    <div key={index} className="flex bg-purple-100 rounded">
                      <div className="col-start-1 p-4">
                        {filter.attribute.label}
                      </div>
                      <div className="col-start-2 p-4">
                        {filter.fromYear.label}
                      </div>
                      <div className="col-start-3 p-4">
                        {filter.fromQuarterly.label}
                      </div>
                      <div className="col-start-4 p-4">
                        {filter.toYear.label}
                      </div>
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
              </div>
              <Dropdown
                initialIndex={0}
                onValueChange={setOrderBy}
                options={orderByOptions}
                title={`Order by: ${orderBy?.label}`}
              />
            </div>
          </>
        )}

        <div className="grid grid-cols-4  gap-12 mt-12">
          {data?.data.map((company: Company, index: number) => (
            <div key={index} className="contents">
              {index === 0 && (
                <div className="contents">
                  <div className="font-bold text-xl">Ticker</div>
                  <div className="font-bold text-xl">Revenue from q1 2020</div>
                  <div className="font-bold text-xl">Revenue from q3 2022</div>
                  <div className="font-bold text-xl">Ratio</div>
                </div>
              )}
              <div>{company.ticker}</div>
              <div>{company.revenue_from_quarter}</div>
              <div>{company.revenue_to_quarter}</div>
              <div>{company.revenue_ratio}</div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
};
export default App;

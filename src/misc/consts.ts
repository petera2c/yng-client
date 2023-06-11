export const API_URL = "http://localhost:4001";
export const QUARTERLY_OPTIONS = [
  { value: "Q1" },
  { value: "Q2" },
  { value: "Q3" },
  { value: "Q4" },
];
export const QUARTERLY_FILTER_ATTRIBUTES = [
  { value: "cost_and_expenses" },
  { value: "cost_of_revenue" },
  {
    value: "depreciation_and_amortization",
  },
  { value: "ebitda" },
  { value: "eps" },
  { value: "eps_diluted" },
  {
    value: "general_and_administrative_expenses",
  },
  { value: "gross_profit" },
  { value: "income_before_tax" },
  { value: "income_tax_expense" },
  { value: "net_income" },
  { value: "operating_expenses" },
  { value: "operating_income" },
  {
    value: "research_and_development_expenses",
  },
  { value: "revenue" },
  {
    value: "selling_and_marketing_expenses",
  },
  {
    value: "selling_general_and_administrative_expenses",
  },
];

export const STOCK_FILTER_ATTRIBUTES = [
  { label: "Company name", value: "company_name" },
  { label: "Country", value: "country" },
  { label: "Forward P/E", value: "fwd_pe_ratio" },
  { label: "Industry", value: "industry" },
  { label: "Is ETF", value: "is_eft" },
  { label: "Market cap", value: "market_cap" },
  { label: "P/E ratio", value: "pe_ratio" },
  { label: "P/S ratio", value: "ps_ratio" },
  { label: "Sector", value: "sector" },
  { label: "Ticker", value: "ticker" },
];

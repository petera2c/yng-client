export const API_URL = "http://localhost:4001";
export const QUARTERLY_OPTIONS = [
  { value: "Q1" },
  { value: "Q2" },
  { value: "Q3" },
  { value: "Q4" },
];
export const QUARTERLY_FILTER_ATTRIBUTES = [
  { label: "Cost and expenses", value: "cost_and_expenses" },
  { label: "Cost of revenue", value: "cost_of_revenue" },
  {
    label: "Depreciation and amortization",
    value: "depreciation_and_amortization",
  },
  { label: "Diluted EPS", value: "eps_diluted" },
  { label: "EBITDA", value: "ebitda" },
  { label: "EBITDA ratio", value: "ebitda_ratio" },
  { label: "EPS", value: "eps" },
  {
    label: "General and administrative expenses",
    value: "general_and_administrative_expenses",
  },
  { label: "Gross profit", value: "gross_profit" },
  { label: "Gross profit ratio", value: "gross_profit_ratio" },
  { label: "Income before tax", value: "income_before_tax" },
  { label: "Income before tax ratio", value: "income_before_tax_ratio" },
  { label: "Income tax expense", value: "income_tax_expense" },
  { label: "Interest expense", value: "interest_expense" },
  { label: "Interest income", value: "interest_income" },
  { label: "Net income", value: "net_income" },
  { label: "Net income ratio", value: "net_income_ratio" },
  { label: "Operating income", value: "operating_income" },
  { label: "Operating income ratio", value: "operating_income_ratio" },
  { label: "Operating expenses", value: "operating_expenses" },
  { label: "Other expenses", value: "other_expenses" },
  {
    label: "Research and development expenses",
    value: "research_and_development_expenses",
  },
  { label: "Revenue", value: "revenue" },
  {
    label: "Selling and marketing expenses",
    value: "selling_and_marketing_expenses",
  },
  {
    label: "Selling, general, and administrative expenses",
    value: "selling_general_and_administrative_expenses",
  },
  {
    label: "Total other income expenses net",
    value: "total_other_income_expenses_net",
  },
  { label: "Weighted average shs out", value: "weighted_average_shs_out" },
  {
    label: "Weighted average shs out dil",
    value: "weighted_average_shs_out_dil",
  },
];

export const OPERATORS = [{ value: ">" }, { value: "<" }, { value: "=" }];

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

export const COMPANY_GROWTH_FIELD = "growth";
export const COMPANY_SYMBOL_FIELD = "symbol";

type Filter = {
  attribute: string;
  amount: number;
  comparisonOperator: ">" | "<" | "=";
};

export default Filter;

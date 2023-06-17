import { API_URL } from "@/misc/consts";
import Filter from "@/types/Filter";
import axios from "axios";

export const companiesSearch = async (
  filters: Filter[],
  fromQuarterly: string,
  fromYear: string,
  toQuarterly: string,
  toYear: string,
  orderBy?: string
) => {
  const response = await axios.post(`${API_URL}/make-your-own`, {
    filters,
    fromQuarterly,
    fromYear,
    orderBy,
    toQuarterly,
    toYear,
  });

  return response.data?.rows || [];
};

import {
  UPDATE_SEARCH,
  UPDATE_COMPANY_SYMBOLS,
  UPDATE_SEARCH_QUERY
} from "./constants";
import { ActionWithPayload } from "store";

export type SearchDataProps = {
  primaryExchange: string;
  sector: string;
  currency: string;
  companyName: string;
  symbol: string;
};

export type UpdateSearchAction = ActionWithPayload<
  typeof UPDATE_SEARCH,
  SearchDataProps
>;
export const updateSearchAction = (
  search: SearchDataProps
): UpdateSearchAction => ({
  type: UPDATE_SEARCH,
  payload: search
});

export type CompanySymbolData = {
  symbol: string;
  name: string;
  exchange: string;
};
export type UpdateCompanySymbolAction = ActionWithPayload<
  typeof UPDATE_COMPANY_SYMBOLS,
  CompanySymbolData[]
>;
export const updateCompanySymbolsAction = (
  companySymbols: CompanySymbolData[]
): UpdateCompanySymbolAction => ({
  type: UPDATE_COMPANY_SYMBOLS,
  payload: companySymbols
});

export type UpdateSearchQueryAction = ActionWithPayload<
  typeof UPDATE_SEARCH_QUERY,
  string
>;
export const updateSearchQueryAction = (
  searchQuery: string
): UpdateSearchQueryAction => ({
  type: UPDATE_SEARCH_QUERY,
  payload: searchQuery
});

export type HeadlineAction =
  | UpdateSearchQueryAction
  | UpdateCompanySymbolAction
  | UpdateSearchAction;

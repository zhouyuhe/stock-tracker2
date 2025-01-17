import { RESET } from "store/constants";
import {
  UPDATE_COMPANY_SYMBOLS,
  UPDATE_SEARCH,
  UPDATE_SEARCH_QUERY
} from "./constants";
import { CompanySymbolData, HeadlineAction, SearchData } from "./actions";
import { Reducer } from "redux";
import { ResetAction } from "store/actions";

export type HeadlineState = {
  readonly selectedSearch: SearchData | null;
  readonly enteredSearchQuery: string;
  readonly selectedCompanySymbols: CompanySymbolData[] | undefined;
};

const initialState: HeadlineState = {
  selectedSearch: null,
  enteredSearchQuery: "",
  selectedCompanySymbols: undefined
};

export const headlineReducer: Reducer<
  Readonly<HeadlineState>,
  HeadlineAction | ResetAction
> = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SEARCH:
      return {
        ...state,
        selectedSearch: action.payload
      };
    case UPDATE_COMPANY_SYMBOLS:
      return {
        ...state,
        selectedCompanySymbols: action.payload
      };
    case UPDATE_SEARCH_QUERY:
      return {
        ...state,
        enteredSearchQuery: action.payload
      };
    case RESET:
      return { ...initialState };
    default:
      return state;
  }
};

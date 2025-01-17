import { RESET } from "store/constants";
import { UPDATE_COMPANY_OVERVIEW } from "./constants";
import { UpdateCompanyOverviewAction, CompanyData } from "./actions";
import { ResetAction } from "store/actions";
import { Reducer } from "redux";

export type CompanyState = {
  readonly selectedCompanyOverview: CompanyData | null;
};

const initialState: CompanyState = { selectedCompanyOverview: null };

export const companyOverviewReducer: Reducer<
  Readonly<CompanyState>,
  UpdateCompanyOverviewAction | ResetAction
> = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COMPANY_OVERVIEW:
      return {
        ...state,
        selectedCompanyOverview: action.payload
      };
    case RESET:
      return { ...initialState };
    default:
      return state;
  }
};

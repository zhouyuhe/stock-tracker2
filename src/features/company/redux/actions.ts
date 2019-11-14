import { UPDATE_COMPANY_OVERVIEW } from "./constants";
import { ActionWithPayload } from "store";

export type CompanyData = {
  companyName: string;
  website: string;
  symbol: string;
  description: string;
};

export const updateCompanyOverviewAction = (
  companyOverview: CompanyData
): UpdateCompanyOverviewAction => ({
  type: UPDATE_COMPANY_OVERVIEW,
  payload: companyOverview
});

export type UpdateCompanyOverviewAction = ActionWithPayload<
  typeof UPDATE_COMPANY_OVERVIEW,
  CompanyData
>;

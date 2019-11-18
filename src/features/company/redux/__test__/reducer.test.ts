import { UPDATE_COMPANY_OVERVIEW } from "../constants";
import { companyOverviewReducer, CompanyState } from "../reducer";
import { UpdateCompanyOverviewAction } from "../actions";

describe("with an UPDATE_COMPANY_OVERVIEW action", () => {
  let newState: CompanyState;

  beforeAll(() => {
    const initialState: CompanyState = {
      selectedCompanyOverview: null
    };
    const action: UpdateCompanyOverviewAction = {
      type: UPDATE_COMPANY_OVERVIEW,
      payload: {
        website: "Apple Inc.com",
        companyName: "apple",
        symbol: "AA",
        description: "hello"
      }
    };
    newState = companyOverviewReducer(initialState, action);
  });

  it("it updates company overview with website, companyName, symbol and description", () => {
    expect(newState.selectedCompanyOverview).toEqual({
      website: "Apple Inc.com",
      companyName: "apple",
      symbol: "AA",
      description: "hello"
    });
  });
});

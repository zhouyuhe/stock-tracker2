import {
  UPDATE_SEARCH,
  UPDATE_SEARCH_QUERY,
  UPDATE_COMPANY_SYMBOLS
} from "../constants";
import { headlineReducer, HeadlineState } from "../reducer";
import {
  UpdateSearchAction,
  UpdateSearchQueryAction,
  UpdateCompanySymbolAction
} from "../actions";

describe("with an UPDATE_SEARCH action", () => {
  let newState: HeadlineState;

  beforeAll(() => {
    const initialState: HeadlineState = {
      selectedSearch: null,
      enteredSearchQuery: "",
      selectedCompanySymbols: []
    };
    const action: UpdateSearchAction = {
      type: UPDATE_SEARCH,
      payload: {
        primaryExchange: "S&P",
        sector: "Tech",
        currency: "USD",
        companyName: "Apple.Inc",
        symbol: "AAPL"
      }
    };
    newState = headlineReducer(initialState, action);
  });

  it("it updates the search query with primaryExchange, sector, currency, companyName and symbol", () => {
    expect(newState.selectedSearch).toEqual({
      primaryExchange: "S&P",
      sector: "Tech",
      currency: "USD",
      companyName: "Apple.Inc",
      symbol: "AAPL"
    });
  });
});

describe("with an UPDATE_SEARCH_QUERY action", () => {
  let newState: HeadlineState;

  beforeAll(() => {
    const initialState: HeadlineState = {
      selectedSearch: null,
      enteredSearchQuery: "",
      selectedCompanySymbols: []
    };
    const action: UpdateSearchQueryAction = {
      type: UPDATE_SEARCH_QUERY,
      payload: "ECOR"
    };
    newState = headlineReducer(initialState, action);
  });

  it('it updates the search query to be "ECOR"', () => {
    expect(newState.enteredSearchQuery).toBe("ECOR");
  });
});

describe("with an UPDATE_COMPANY_SYMBOLS action", () => {
  let newState: HeadlineState;

  beforeAll(() => {
    const initialState = {
      selectedSearch: null,
      enteredSearchQuery: "",
      selectedCompanySymbols: []
    };
    const action: UpdateCompanySymbolAction = {
      type: UPDATE_COMPANY_SYMBOLS,
      payload: [{ symbol: "A", name: "Apple", exchange: "Nasdaq" }]
    };
    newState = headlineReducer(initialState, action);
  });

  it("it updates the company symbol array with symbol, name and exchange", () => {
    expect(newState.selectedCompanySymbols).toEqual([
      { symbol: "A", name: "Apple", exchange: "Nasdaq" }
    ]);
  });
});

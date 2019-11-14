import { combinedReducer, AppState } from "../reducer";

const createInitialState: AppState = {
  stockData: {
    selectedStock: undefined
  },
  headlineData: {
    selectedSearch: null,
    enteredSearchQuery: "",
    selectedCompanySymbols: []
  },
  chartData: {
    selectedChartRange: "5y",
    selectedChartData: null
  },
  keyStatsData: {
    selectedKeyStats: null
  },
  latestNewsData: {
    selectedLatestNews: null
  },
  companyOverviewData: {
    selectedCompanyOverview: null
  },
  peerData: {
    selectedTopPeers: null
  },
  stockTickerData: {
    selectedStockTicker: undefined
  }
};

describe("Test combineReducer with an UNKNOWN action", () => {
  it("it should not change the state when an unknown/invalid action is provided", () => {
    const _init = createInitialState;
    const result = combinedReducer(_init, { type: "TEST__NOTHING" });
    expect(result).toBe(_init);
  });
});

import { UPDATE_KEY_STATS } from "../constants";
import { keyStatsReducer, KeyStatsState } from "../reducer";
import { UpdateKeyStatsAction } from "../actions";

describe("with an UPDATE_KEY_STATS action", () => {
  let newState: KeyStatsState;

  beforeAll(() => {
    const initialState: KeyStatsState = {
      selectedKeyStats: null
    };
    const action: UpdateKeyStatsAction = {
      type: UPDATE_KEY_STATS,
      payload: {
        companyName: "apple",
        symbol: "aapl",
        currency: "usd",
        primaryExchange: "nasdaq",
        open: 1,
        high: 2,
        low: 3,
        previousClose: 3,
        previousVolume: 5,
        avgTotalVolume: 7,
        marketCap: 1,
        peRatio: 2,
        week52High: 3,
        week52Low: 2,
        ytdChange: 2,
        isUSMarketOpen: "true",
        eps: 240
      }
    };
    newState = keyStatsReducer(initialState, action);
  });

  it('it updates the key statistics to "STATS"', () => {
    expect(newState.selectedKeyStats).toEqual({
      companyName: "apple",
      symbol: "aapl",
      currency: "usd",
      primaryExchange: "nasdaq",
      open: 1,
      high: 2,
      low: 3,
      previousClose: 3,
      previousVolume: 5,
      avgTotalVolume: 7,
      marketCap: 1,
      peRatio: 2,
      week52High: 3,
      week52Low: 2,
      ytdChange: 2,
      isUSMarketOpen: "true",
      eps: 240
    });
  });
});

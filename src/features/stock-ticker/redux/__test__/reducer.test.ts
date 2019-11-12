import { UPDATE_STOCK_TICKER } from "../constants";
import { stockTickerReducer, StockTickerState } from "../reducer";
import { UpdateStockTickerAction } from "../actions";

describe("with an UPDATE_STOCK_TICKER action", () => {
  let newState: StockTickerState;

  beforeAll(() => {
    const initialState: StockTickerState = {
      selectedStockTicker: undefined
    };
    const action: UpdateStockTickerAction = {
      type: UPDATE_STOCK_TICKER,
      payload: {
        latestPrice: 1,
        latestUpdate: 12345,
        change: 2,
        changePercent: 3
      }
    };
    newState = stockTickerReducer(initialState, action);
  });

  it('it updates stock to "Stock"', () => {
    expect(newState.selectedStockTicker).toEqual({
      latestPrice: 1,
      latestUpdate: 12345,
      change: 2,
      changePercent: 3
    });
  });
});

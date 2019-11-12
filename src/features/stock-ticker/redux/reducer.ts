import { RESET } from "store/constants";
import { UPDATE_STOCK_TICKER } from "./constants";
import { Reducer } from "redux";
import { UpdateStockTickerAction, StockTickerData } from "./actions";
import { ResetAction } from "store/actions";

export type StockTickerState = {
  selectedStockTicker: StockTickerData | undefined;
};
const initialState: StockTickerState = { selectedStockTicker: undefined };
export const stockTickerReducer: Reducer<
  Readonly<StockTickerState>,
  UpdateStockTickerAction | ResetAction
> = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_STOCK_TICKER:
      return {
        ...state,
        selectedStockTicker: action.payload
      };
    case RESET:
      return { ...initialState };
    default:
      return state;
  }
};

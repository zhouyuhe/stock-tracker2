import { UPDATE_STOCK_TICKER } from "./constants";
import { ActionWithPayload } from "store/actions";
export type StockTickerData = {
  latestPrice: number;
  latestUpdate: number;
  change: number;
  changePercent: number;
};
export type UpdateStockTickerAction = ActionWithPayload<
  typeof UPDATE_STOCK_TICKER,
  StockTickerData
>;
export const updateStockTickerAction = (
  stockTickerData: StockTickerData
): UpdateStockTickerAction => ({
  type: UPDATE_STOCK_TICKER,
  payload: stockTickerData
});

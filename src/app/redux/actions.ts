import { UPDATE_SELECTED_STOCK } from "../redux/constants";
import { ActionWithPayload } from "store/utilities";

export type Stock = {
  name: string;
  symbol: string;
};

export type UpdateStockAction = ActionWithPayload<
  typeof UPDATE_SELECTED_STOCK,
  Stock
>;
export const updateStockAction = (stock: Stock): UpdateStockAction => ({
  type: UPDATE_SELECTED_STOCK,
  payload: stock
});

import { UPDATE_SELECTED_STOCK } from "../redux/constants";
import { Stock } from "../../features//headline/components/Headline";
import { ActionWithPayload } from "store/utilities";

export type UpdateStockAction = ActionWithPayload<
  typeof UPDATE_SELECTED_STOCK,
  Stock
>;
export const updateStockAction = (stock: Stock): UpdateStockAction => ({
  type: UPDATE_SELECTED_STOCK,
  payload: stock
});

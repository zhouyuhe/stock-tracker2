import { UPDATE_SELECTED_STOCK } from "../redux/constants";
import { StockProps } from "../../features//headline/components/Headline";
import { ActionWithPayload } from "store/utilities";

export type UpdateStockAction = ActionWithPayload<
  typeof UPDATE_SELECTED_STOCK,
  StockProps
>;
export const updateStockAction = (stock: StockProps): UpdateStockAction => ({
  type: UPDATE_SELECTED_STOCK,
  payload: stock
});

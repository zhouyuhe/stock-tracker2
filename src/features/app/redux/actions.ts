import { UPDATE_SELECTED_STOCK } from "../redux/constants";
import { ActionWithPayload } from "store/actions";
import { StockProps } from "../../headline/components/Headline";

export type UpdateStockAction = ActionWithPayload<
  typeof UPDATE_SELECTED_STOCK,
  StockProps
>;
export const updateStockAction = (stock: StockProps): UpdateStockAction => ({
  type: UPDATE_SELECTED_STOCK,
  payload: stock
});

import { UPDATE_SELECTED_STOCK } from "./store/constants";
import { ActionWithPayload } from "./store/actions";
import { StockProps } from "./features/headline/components/Headline";

export type UpdateStockAction = ActionWithPayload<
  typeof UPDATE_SELECTED_STOCK,
  StockProps
>;
export const updateStockAction = (stock: StockProps): UpdateStockAction => ({
  type: UPDATE_SELECTED_STOCK,
  payload: stock
});

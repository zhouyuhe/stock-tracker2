import { UPDATE_SELECTED_STOCK, RESET } from "./store/constants";
import { StockProps } from "./features/headline/components/Headline";
import { Reducer } from "redux";
import { UpdateStockAction } from "./actions";
import { ResetAction } from "./store/actions";

export type StockState = {
  selectedStock: StockProps | undefined;
};
const initialState: StockState = {
  selectedStock: undefined
};

export const stockReducer: Reducer<
  StockState,
  UpdateStockAction | ResetAction
> = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SELECTED_STOCK:
      return {
        ...state,
        selectedStock: action.payload
      };
    case RESET:
      return { ...initialState, selectedStock: state.selectedStock };
    default:
      return state;
  }
};

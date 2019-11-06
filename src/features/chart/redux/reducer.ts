import { UPDATE_CHART_RANGE, UPDATE_CHART_DATA, RESET } from "./constants";
import { ChartActions } from "./actions";
import { Reducer } from "redux";

export type ChartState = {
  selectedChartRange: string;
  selectedChartData: { date: Date; close: number }[] | null; // TODO: Create proper structure
};

export type ResetAction = {
  type: typeof RESET;
};

const initialState: ChartState = {
  selectedChartRange: "5y",
  selectedChartData: null
};

export const chartReducer: Reducer<ChartState, ChartActions | ResetAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case UPDATE_CHART_RANGE:
      return {
        ...state,
        selectedChartRange: action.payload,
        selectedChartData: null
      };
    case UPDATE_CHART_DATA:
      return {
        ...state,
        selectedChartData: action.payload
      };
    case RESET:
      return { ...initialState };
    default:
      return state;
  }
};

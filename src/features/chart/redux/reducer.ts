import { UPDATE_CHART_RANGE, UPDATE_CHART_DATA } from "./constants";
import { ChartActions, ChartData } from "./actions";
import { Reducer } from "redux";
import { ResetAction } from "../../../store/actions";
import { RESET } from "../../../store/constants";

export type ChartState = {
  selectedChartRange: string;
  selectedChartData: ChartData[] | null;
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

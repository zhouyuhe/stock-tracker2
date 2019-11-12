import { UPDATE_CHART_RANGE, UPDATE_CHART_DATA } from "./constants";
import { ChartActions, ChartData } from "./actions";
import { Reducer } from "redux";
import { ResetAction } from "store/actions";
import { RESET } from "store/constants";
import { ChartRange } from "../components/Chart";

export type ChartState = {
  selectedChartRange: ChartRange;
  selectedChartData: ChartData[] | null;
};

const initialState: ChartState = {
  selectedChartRange: "5Y",
  selectedChartData: null
};

export const chartReducer: Reducer<
  Readonly<ChartState>,
  ChartActions | ResetAction
> = (state = initialState, action) => {
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

import { UPDATE_CHART_RANGE, UPDATE_CHART_DATA } from "./constants";
import { ActionWithPayload } from "store/actions";
export type ChartData = {
  date: string;
  close: number;
};

export type UpdateChartRangeAction = ActionWithPayload<
  typeof UPDATE_CHART_RANGE,
  string
>;

export const updateChartAction = (
  chartRange: string
): UpdateChartRangeAction => ({
  type: UPDATE_CHART_RANGE,
  payload: chartRange
});

export type UpdateChartDataAction = ActionWithPayload<
  typeof UPDATE_CHART_DATA,
  ChartData[]
>;

export const updateChartDataAction = (
  chartData: ChartData[]
): UpdateChartDataAction => ({
  type: UPDATE_CHART_DATA,
  payload: chartData
});

export type ChartActions = UpdateChartRangeAction | UpdateChartDataAction;

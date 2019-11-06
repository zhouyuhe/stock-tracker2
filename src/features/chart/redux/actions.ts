import { UPDATE_CHART_RANGE, UPDATE_CHART_DATA } from "./constants";

export type UpdateChartRangeAction = {
  type: typeof UPDATE_CHART_RANGE;
  payload: string;
};

export const updateChartAction = (
  chartRange: string
): UpdateChartRangeAction => ({
  type: UPDATE_CHART_RANGE,
  payload: chartRange
});

export type UpdateChartDataAction = {
  type: typeof UPDATE_CHART_DATA;
  payload: { date: Date; close: number }[] | null;
};

export const updateChartDataAction = (
  chartData: { date: Date; close: number }[] | null
): UpdateChartDataAction => ({
  type: UPDATE_CHART_DATA,
  payload: chartData
});

export type ChartActions = UpdateChartRangeAction | UpdateChartDataAction;

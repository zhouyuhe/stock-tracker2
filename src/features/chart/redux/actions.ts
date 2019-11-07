import { UPDATE_CHART_RANGE, UPDATE_CHART_DATA } from "./constants";
import { ActionWithPayload } from "../../../store/actions";

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
  { date: Date; close: number }[] | null
>;

export const updateChartDataAction = (
  chartData: { date: Date; close: number }[] | null
): UpdateChartDataAction => ({
  type: UPDATE_CHART_DATA,
  payload: chartData
});

export type ChartActions = UpdateChartRangeAction | UpdateChartDataAction;

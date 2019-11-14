import { UPDATE_CHART_DATA, UPDATE_CHART_RANGE } from "../constants";
import { chartReducer, ChartState } from "../reducer";
import { UpdateChartDataAction, UpdateChartRangeAction } from "../actions";

describe("with an UPDATE_CHART_RANGE action", () => {
  let newState: ChartState;

  beforeAll(() => {
    const initialState: ChartState = {
      selectedChartRange: "5Y",
      selectedChartData: null
    };
    const action: UpdateChartRangeAction = {
      type: UPDATE_CHART_RANGE,
      payload: "1Y"
    };
    newState = chartReducer(initialState, action);
  });

  it("it updates the selected chart range to 2y", () => {
    expect(newState.selectedChartRange).toBe("1Y");
  });
});

describe("with an UPDATE_CHART_DATA action", () => {
  let newState: ChartState;

  beforeAll(() => {
    const initialState: ChartState = {
      selectedChartData: null,
      selectedChartRange: "5Y"
    };
    const action: UpdateChartDataAction = {
      type: UPDATE_CHART_DATA,
      payload: [{ date: "2014-09-09", close: 2 }]
    };
    newState = chartReducer(initialState, action);
  });

  it('it updates the chart to "Chart Data"', () => {
    expect(newState.selectedChartData).toEqual([
      { date: "2014-09-09", close: 2 }
    ]);
  });
});

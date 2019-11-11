import { UPDATE_LATEST_NEWS } from "../constants";
import { latestNewsReducer, LatestNewsState } from "../reducer";
import { UpdateLatestNewsAction } from "../actions";

describe("with an UPDATE_LATEST_NEWS action", () => {
  let newState: LatestNewsState;

  beforeAll(() => {
    const initialState = {
      selectedLatestNews: null
    };
    const action: UpdateLatestNewsAction = {
      type: UPDATE_LATEST_NEWS,
      payload: [
        { headline: "hi", source: "FT", date: "2012-02-09", url: "www.ft.com" }
      ]
    };
    newState = latestNewsReducer(initialState, action);
  });

  it('it updates the latest news to "NEWS"', () => {
    expect(newState.selectedLatestNews).toEqual([
      { headline: "hi", source: "FT", date: "2012-02-09", url: "www.ft.com" }
    ]);
  });
});
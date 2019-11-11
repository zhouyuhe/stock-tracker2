import { UPDATE_LATEST_NEWS } from "./constants";
import { ActionWithPayload } from "store/actions";

export type LatestNewsData = {
  headline: string;
  source: string;
  date: string;
  url: string;
};

export type UpdateLatestNewsAction = ActionWithPayload<
  typeof UPDATE_LATEST_NEWS,
  LatestNewsData[]
>;
export const updateLatestNewsAction = (
  latestNews: LatestNewsData[]
): UpdateLatestNewsAction => ({
  type: UPDATE_LATEST_NEWS,
  payload: latestNews
});

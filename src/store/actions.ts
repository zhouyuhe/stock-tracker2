import { BOOTSTRAP, RESET } from "./constants";

export const bootstrap = (): BootstrapAction => ({ type: BOOTSTRAP });
export type BootstrapAction = Action<typeof BOOTSTRAP>;
export type ResetAction = Action<typeof RESET>;

export type Action<T extends string> = { type: T };
export type ActionWithPayload<T extends string, P> = Action<T> & {
  payload: P;
};

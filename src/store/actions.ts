import { BOOTSTRAP, RESET } from "./constants";

export const bootstrap = () => ({ type: BOOTSTRAP });
export type BootstrapAction = {
  type: typeof BOOTSTRAP;
};

export type ResetAction = {
  type: typeof RESET;
};

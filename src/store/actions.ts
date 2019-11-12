import { BOOTSTRAP, RESET } from "./constants";
import { Action } from "./utilities";

export const bootstrap = (): BootstrapAction => ({ type: BOOTSTRAP });
export type BootstrapAction = Action<typeof BOOTSTRAP>;
export const resetAction = () => ({ type: RESET });
export type ResetAction = Action<typeof RESET>;

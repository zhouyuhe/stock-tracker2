import { BOOTSTRAP, RESET } from "./constants";

export const bootstrap = () => ({ type: BOOTSTRAP });
export type BootstrapAction = Action<typeof BOOTSTRAP>;
export type ResetAction = Action<typeof RESET>;

export type Action<Type extends string> = { type: Type };
export type ActionWithPayload<Type extends string, Payload> = Action<Type> & {
  payload: Payload;
};

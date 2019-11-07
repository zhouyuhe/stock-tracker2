import { BOOTSTRAP, RESET } from "./constants";

export const bootstrap = () => ({ type: BOOTSTRAP });
export type BootstrapAction = Action<typeof BOOTSTRAP>;
export type ResetAction = Action<typeof RESET>;

export type Action<Type extends string> = { type: Type };
export type ActionWithPayload<Type extends string, Payload> = Action<Type> & {
  payload: Payload;
};
// export type Action<Type extends string, Payload> = { type: Type, payload: Payload };

// const A: Action<'Test', number> = { type: 'Test', payload: 1 };
// const B: Action<'Test_2', []> = { type: 'Test_2', payload: [] };

// const reducer = (state: any, action: typeof A | typeof B) => {
//   switch(action.type) {
//     case 'Test':
//       return action.payload;
//     case 'Test_2':
//       return action.payload
//     default:
//       return state;
//   }
// }

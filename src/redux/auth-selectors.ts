import { AppState } from "./redux-store";

export const selectIsAuth = (state: AppState) => {
  return state.auth.isAuth;
}
export const selectUserLogin = (state: AppState) => {
  return state.auth.login;
}
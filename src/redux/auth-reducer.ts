import {ResultCodes} from '../services/samurai.service';
import {authAPI} from '../services/auth-api';
import {securityAPI} from '../services/security-api'
import {FormAction, stopSubmit} from "redux-form";
import { InferActionsType, BaseThunkType } from './redux-store';

const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null
}

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch(action.type) {
    case 'AUTH/SET_USER_DATA':
      return {
        ...state,
        ...action.payload
      }
    case 'AUTH/GET_CAPTCHA_URL_SUCCESS':
      return {
        ...state,
        captchaUrl: action.payload
      }

    default:
      return state;
  }
}

export const actions = {
  setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'AUTH/SET_USER_DATA',
    payload: { userId, email, login, isAuth }
  } as const),
  getCaptchaUrlSuccess: (captchaUrl: string) => ({
    type: 'AUTH/GET_CAPTCHA_URL_SUCCESS',
    payload: captchaUrl
  } as const)
};


export const getAuthUserData = (): ThunkType => async (dispatch) => {
  const authData = await authAPI.authMe();
  if (authData.resultCode === ResultCodes.Success) {
    const { id, email, login } = authData.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
  const loginData = await authAPI.login(email, password, rememberMe, captcha);
  const {resultCode, messages} = loginData;
  if (resultCode === ResultCodes.Success) {
    dispatch(getAuthUserData());
  } else {
    if (resultCode === ResultCodes.CaptchaIsRequired) {
      dispatch(getCaptchaUrl())
    }
    const errorMessage = messages.length > 0 ? messages[0] : "Some error"
    dispatch(stopSubmit("login", {_error: errorMessage}));
    dispatch({type: 123})
  }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url;
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
}

export const logout = (): ThunkType => async (dispatch) => {
  const response = await authAPI.logout();
  if (response.resultCode === ResultCodes.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
}

export default authReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;
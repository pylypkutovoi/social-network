import {ResultCodes} from '../services/samurai.service';
import {authAPI} from '../services/auth-api';
import {securityAPI} from '../services/security-api'
import {stopSubmit} from "redux-form";


const SET_USER_DATA = "social/auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "social/auth/GET_CAPTCHA_URL_SUCCESS";

const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaUrl: null as string | null
}

export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType => {
  switch(action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload
      }
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        captchaUrl: action.payload
      }

    default:
      return state;
  }
}
type SetAuthUserData = {
  type: typeof SET_USER_DATA,
  payload: { userId: number | null, email: string | null, login: string | null, isAuth: boolean}
}
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserData => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth }
});

type GetCaptchaUrlSucces = {
  type: typeof GET_CAPTCHA_URL_SUCCESS;
  payload: string
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSucces=> ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: captchaUrl
})

export const getAuthUserData = () => async (dispatch: any) => {
  const authData = await authAPI.authMe();
  if (authData.resultCode === ResultCodes.Success) {
    const { id, email, login } = authData.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
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
  }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
  const data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url;
  dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const logout = () => async (dispatch: any) => {
  const response = await authAPI.logout();
  if (response.resultCode === ResultCodes.Success) {
    dispatch(setAuthUserData(null, null, null, false));
  }
}

export default authReducer;
import {authAPI, securityAPI} from '../services/samurai.service';
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
  const response = await authAPI.authMe();
  if (response.resultCode === 0) {
    const { id, email, login } = response.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
  const response = await authAPI.login(email, password, rememberMe, captcha);
  const {resultCode, messages} = response.data;
  if (resultCode === 0) {
    dispatch(getAuthUserData());
  } else {
    if (resultCode === 10) {
      dispatch(getCaptchaUrl())
    }
    const errorMessage = messages.length > 0 ? messages[0] : "Some error"
    dispatch(stopSubmit("login", {_error: errorMessage}));
  }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url;

  dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const logout = () => async (dispatch: any) => {
  const response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
}

export default authReducer;
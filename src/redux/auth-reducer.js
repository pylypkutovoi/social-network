import {authAPI, securityAPI} from '../services/samurai.service';
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "social/auth/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "social/auth/GET_CAPTCHA_URL_SUCCESS";

const intialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null
}
const authReducer = (state = intialState, action) => {
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
export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth }
});

export const getCaptchaUrlSuccess = (captchaUrl) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: captchaUrl
})

export const getAuthUserData = () => async (dispatch) => {
  const response = await authAPI.authMe();
  if (response.resultCode === 0) {
    const { id, email, login } = response.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
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

export const getCaptchaUrl = () => async (dispatch) => {
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url;

  dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const logout = () => async (dispatch) => {
  const response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
}

export default authReducer;
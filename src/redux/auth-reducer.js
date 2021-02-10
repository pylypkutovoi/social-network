import {authAPI} from '../services/samurai.service';
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'social/auth/SET_USER_DATA';

const intialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false
}
const authReducer = (state = intialState, action) => {
  switch(action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload
      }

    default:
      return state;
  }
}
export const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth }
});

export const getAuthUserData = () => async (dispatch) => {
  const response = await authAPI.authMe();
  if (response.resultCode === 0) {
    const { id, email, login } = response.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
}
export const login = (email, password, rememberMe) => async (dispatch) => {
  const response = await authAPI.login(email, password, rememberMe);
  if (response.data.resultCode === 0) {
    dispatch(getAuthUserData());
  } else {
    const {messages} = response.data;
    const errorMessage = messages.length > 0 ? messages[0] : "Some error"
    dispatch(stopSubmit("login", {_error: errorMessage}));
  }
}

export const logout = () => async (dispatch) => {
  const response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
}

export default authReducer;
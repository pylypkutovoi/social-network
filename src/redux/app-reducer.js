import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCES = 'INITIALIZED_SUCCES';

const intialState = {
  initialized: false
}
const appReducer = (state = intialState, action) => {
  switch(action.type) {
    case INITIALIZED_SUCCES:
      return {
        ...state,
        initialized: true
      }

    default:
      return state;
  }
}
export const initializedSucces = () => ({
  type: INITIALIZED_SUCCES
});

export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuthUserData());

  promise.then(() => {
      dispatch(initializedSucces());
    }
  )

}



export default appReducer;
import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCES = 'INITIALIZED_SUCCES';

const intialState = {
  initialized: false
}

type InitialStateType = typeof intialState

const appReducer = (state = intialState, action: any): InitialStateType => {
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
type InitializedSucces = {
  type: typeof INITIALIZED_SUCCES;
}
export const initializedSucces = (): InitializedSucces => ({
  type: INITIALIZED_SUCCES
});

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData());

  promise.then(() => {
      dispatch(initializedSucces());
    }
  )

}



export default appReducer;
import {getAuthUserData} from "./auth-reducer";
import { InferActionsType } from "./redux-store";

const intialState = {
  initialized: false
}

const appReducer = (state = intialState, action: ActionsTypes): InitialStateType => {
  switch(action.type) {
    case 'APP/INITIALIZED_SUCCES':
      return {
        ...state,
        initialized: true
      }

    default:
      return state;
  }
}

const actions = {
  initializedSucces: () => ({type: 'APP/INITIALIZED_SUCCES'} as const)
}

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData());

  promise.then(() => {
      dispatch(actions.initializedSucces());
    }
  )

}

export default appReducer;

export type InitialStateType = typeof intialState;
type ActionsTypes = InferActionsType<typeof actions>;
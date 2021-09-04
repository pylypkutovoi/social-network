import { ResultCodes, TResponse } from './../services/samurai.service';
import { BaseThunkType, InferActionsType } from './redux-store';
import {UserType} from './../types/types';
import {usersAPI} from '../services/users-api';
import {updateObjectInArray} from "../utils/object-helpers";
import {Dispatch} from 'redux';

const initialState = {
  users: [] as UserType[],
  pageSize: 10,
  totalUsersCount: 100,
  currentPage: 1,
  isLoading: true,
  isFollowing: [] as number[]
}

const usersReducer = (state = initialState, action: ActionsType): InitialState => {
  switch(action.type) {
    case 'USERS/FOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
      }
    case 'USERS/UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
      }
    case 'USERS/SET_USERS':
      return {
        ...state,
        users: action.users
      }
    case 'USERS/SET_CURRENT_PAGE':
      return {
        ...state, currentPage: action.currentPage
      }
      case 'USERS/SET_TOTAL_USERS_COUNT':
      return {
        ...state, totalUsersCount: action.count
      }
    case 'USERS/FETCH_USERS_SUCCESS':
      return {
        ...state,
        isLoading: action.isFetching
      }
    case 'USERS/FOLLOW_USER_SUCCESS':
      return {
        ...state,
        isFollowing: action.isFetching
          ? [...state.isFollowing, action.userId]
          : state.isFollowing.filter(id => id !== action.userId)
      }
    default:
      return state;
  }
}

export const actions = {
  followSucces: (userId: number) => ({ type: 'USERS/FOLLOW', userId } as const),
  unfollowSucces: (userId: number) => ({ type: 'USERS/UNFOLLOW', userId } as const),
  setUsers: (users: UserType[]) => ({ type: 'USERS/SET_USERS', users } as const),
  setCurrentPage: (currentPage: number) => ({ type: 'USERS/SET_CURRENT_PAGE', currentPage} as const),
  setTotalUsersCount: (count: number) => ({ type: 'USERS/SET_TOTAL_USERS_COUNT', count} as const),
  loadingUsers: (isFetching: boolean) => ({ type: 'USERS/FETCH_USERS_SUCCESS', isFetching} as const),
  userFollowingProgress: (isFetching: boolean, userId: number) => ({
  type: 'USERS/FOLLOW_USER_SUCCESS', isFetching, userId
} as const)
}


export const requestUsers = (page: number, pageSize: number): ThunkType => async (dispatch) => {
  dispatch(actions.loadingUsers(true));
  dispatch(actions.setCurrentPage(page))
  
  const data = await usersAPI.getUsers(page, pageSize)

  dispatch(actions.loadingUsers(false));
  dispatch(actions.setUsers(data.items));
  dispatch(actions.setTotalUsersCount(data.totalCount));
    

}
const followUnffolow = async (dispatch: Dispatch<ActionsType>,
                              userId: number,
                              apiMethod: (userId: number) => Promise<TResponse>,
                              actionCreator: (userId:  number) => ActionsType) => {
  dispatch(actions.userFollowingProgress(true, userId));
  const data = await apiMethod(userId);

  if (data.resultCode === ResultCodes.Success) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.userFollowingProgress(false, userId));

}
export const follow = (userId: number): ThunkType => async (dispatch) => {
  await followUnffolow(dispatch, userId, usersAPI.followUser, actions.followSucces);
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
  await followUnffolow(dispatch, userId, usersAPI.unfollowUser, actions.unfollowSucces);
}


export default usersReducer;

export type InitialState = typeof initialState;
type ActionsType = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;

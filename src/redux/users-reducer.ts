import { InferActionsType } from './redux-store';
import {UserType} from './../types/types';
import {usersAPI} from '../services/users-api';
import {updateObjectInArray} from "../utils/object-helpers";

const initialState = {
  users: [] as UserType[],
  pageSize: 10,
  totalUsersCount: 100,
  currentPage: 1,
  isLoading: true,
  isFollowing: [] as number[]
}
export type InitialState = typeof initialState;

const usersReducer = (state = initialState, action: ActionsTypes): InitialState => {
  switch(action.type) {
    case 'FOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
      }
    case 'UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
      }
    case 'SET_USERS':
      return {
        ...state,
        users: action.users
      }
    case 'SET_CURRENT_PAGE':
      return {
        ...state, currentPage: action.currentPage
      }
      case 'SET_TOTAL_USERS_COUNT':
      return {
        ...state, totalUsersCount: action.count
      }
    case 'FETCH_USERS_SUCCESS':
      return {
        ...state,
        isLoading: action.isFetching
      }
    case 'FOLLOW_USER_SUCCESS':
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
type ActionsTypes = InferActionsType<typeof actions>;

export const actions = {
  followSucces: (userId: number) => ({ type: 'FOLLOW', userId } as const),
  unfollowSucces: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
  setUsers: (users: UserType[]) => ({ type: 'SET_USERS', users } as const),
  setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage} as const),
  setTotalUsersCount: (count: number) => ({ type: 'SET_TOTAL_USERS_COUNT', count} as const),
  loadingUsers: (isFetching: boolean) => ({ type: 'FETCH_USERS_SUCCESS', isFetching} as const),
  userFollowingProgress: (isFetching: boolean, userId: number) => ({
  type: 'FOLLOW_USER_SUCCESS', isFetching, userId
} as const)
}

export const requestUsers = (page: number, pageSize: number) => async (dispatch: any) => {
  dispatch(actions.loadingUsers(true));
  dispatch(actions.setCurrentPage(page))
  
  const data = await usersAPI.getUsers(page, pageSize)

  dispatch(actions.loadingUsers(false));
  dispatch(actions.setUsers(data.items));
  dispatch(actions.setTotalUsersCount(data.totalCount));
    

}
const followUnffolow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
  dispatch(actions.userFollowingProgress(true, userId));
  const data = await apiMethod(userId);
  if (data.resultCode === 0 ) {
    dispatch(actionCreator(userId))
  }
  dispatch(actions.userFollowingProgress(false, userId));

}
export const follow = (userId: number) => (dispatch: any) => {
  followUnffolow(dispatch, userId, usersAPI.followUser, actions.followSucces);
}

export const unfollow = (userId: number) => async (dispatch: any) => {
  followUnffolow(dispatch, userId, usersAPI.unfollowUser, actions.unfollowSucces);
}


export default usersReducer;
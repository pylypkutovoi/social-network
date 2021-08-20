import {UserType} from './../types/types';
import {usersAPI} from '../services/samurai.service';
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';


const initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 100,
  currentPage: 1,
  isLoading: true,
  isFollowing: [] as Array<number>
}
export type InitialState = typeof initialState;

const usersReducer = (state = initialState, action: any): InitialState => {
  switch(action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
      }
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
      }
    case SET_USERS:
      return {
        ...state,
        users: action.users
      }
    case SET_CURRENT_PAGE:
      return {
        ...state, currentPage: action.currentPage
      }
      case SET_TOTAL_USERS_COUNT:
      return {
        ...state, totalUsersCount: action.count
      }
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        isLoading: action.isFetching
      }
    case FOLLOW_USER_SUCCESS:
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
type FollowSucces = {
  type: typeof FOLLOW;
  userId: number;
}
export const followSucces = (userId: number): FollowSucces => ({ type: FOLLOW, userId });

type UnfollowSucces = {
  type: typeof UNFOLLOW;
  userId: number;
}
export const unfollowSucces = (userId: number): UnfollowSucces => ({ type: UNFOLLOW, userId });

type SetUsers = {
  type: typeof SET_USERS;
  users: Array<UserType>;
}
export const setUsers = (users: Array<UserType>): SetUsers => ({ type: SET_USERS, users });

type SetCurrentPage = {
  type: typeof SET_CURRENT_PAGE;
  currentPage: number;
}
export const setCurrentPage = (currentPage: number): SetCurrentPage => ({ type: SET_CURRENT_PAGE, currentPage});

type SetTotalUsersCount = {
  type: typeof SET_TOTAL_USERS_COUNT;
  count: number;
}
export const setTotalUsersCount = (count: number): SetTotalUsersCount => ({ type: SET_TOTAL_USERS_COUNT, count});

type LoadingUsers = {
  type: typeof FETCH_USERS_SUCCESS;
  isFetching: boolean;
}
export const loadingUsers = (isFetching: boolean): LoadingUsers => ({ type: FETCH_USERS_SUCCESS, isFetching});

type UserFollowingProgress = {
  type: typeof FOLLOW_USER_SUCCESS;
  isFetching: boolean;
  userId: number;
}

export const userFollowingProgress = (isFetching: boolean, userId: number): UserFollowingProgress => ({
  type: FOLLOW_USER_SUCCESS, isFetching, userId
});

export const requestUsers = (page: number, pageSize: number) => async (dispatch: any) => {
  dispatch(loadingUsers(true));
  dispatch(setCurrentPage(page))
  
  const data = await usersAPI.getUsers(page, pageSize)

  dispatch(loadingUsers(false));
  dispatch(setUsers(data.items));
  dispatch(setTotalUsersCount(data.totalCount));
    

}
const followUnffolow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
  dispatch(userFollowingProgress(true, userId));
  const data = await apiMethod(userId);
  if (data.resultCode === 0 ) {
    dispatch(actionCreator(userId))
  }
  dispatch(userFollowingProgress(false, userId));

}
export const follow = (userId: number) => (dispatch: any) => {
  followUnffolow(dispatch, userId, usersAPI.followUser, followSucces);
}

export const unfollow = (userId: number) => async (dispatch: any) => {
  followUnffolow(dispatch, userId, usersAPI.unfollowUser, unfollowSucces);
}


export default usersReducer;
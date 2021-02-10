import {usersAPI} from '../services/samurai.service';
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS'

const intialState = {
  users: [],
  pageSize: 10,
  totalUsersCount: 100,
  currentPage: 1,
  isLoading: true,
  isFollowing: []
}
const usersReducer = (state = intialState, action) => {
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
export const followSucces = (userId) => ({ type: FOLLOW, userId });
export const unfollowSucces = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (count) => ({ type: SET_TOTAL_USERS_COUNT, count});
export const loadingUsers = (isFetching) => ({ type: FETCH_USERS_SUCCESS, isFetching});
export const userFollowingProgress = (isFetching, userId) => ({
  type: FOLLOW_USER_SUCCESS, isFetching, userId
});

export const requestUsers = (page, pageSize) => (dispatch) => {
  dispatch(loadingUsers(true));
  dispatch(setCurrentPage(page))
  usersAPI.getUsers(page, pageSize).then(data => {
    dispatch(loadingUsers(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
    //dispatch(setTotalUsersCount(100));
  })

}
const followUnffolow = async (dispatch, userId, apiMethod, actionCreator) => {
  dispatch(userFollowingProgress(true, userId));
  const data = await apiMethod(userId);
  if (data.resultCode === 0 ) {
    dispatch(actionCreator(userId))
  }
  dispatch(userFollowingProgress(false, userId));

}
export const follow = (userId) => (dispatch) => {
  followUnffolow(dispatch, userId, usersAPI.followUser, followSucces);
}

export const unfollow = (userId) => async (dispatch) => {
  followUnffolow(dispatch, userId, usersAPI.unfollowUser, unfollowSucces);
}


export default usersReducer;
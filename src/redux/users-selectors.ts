import {createSelector} from "reselect";
import { AppState } from "./redux-store";

export const getUsersSelector = (state: AppState) => {
  return state.usersPage.users;
}

export const  getUsers = createSelector(getUsersSelector, (users) => {
  return users.filter(u => true);
});

export const getPageSize = (state: AppState) => {
  return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: AppState) => {
  return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: AppState) => {
  return state.usersPage.currentPage
}
export const getIsLoading = (state: AppState) => {
  return state.usersPage.isLoading
}
export const getIsFollowing = (state: AppState) => {
  return state.usersPage.isFollowing
}

export const getUsersFilter = (state: AppState) => {
  return state.usersPage.filter
}
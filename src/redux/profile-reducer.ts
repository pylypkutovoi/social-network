import { ProfileType, PhotosType } from './../types/types';
import {profileAPI, usersAPI} from '../services/samurai.service';
import {stopSubmit} from "redux-form";
import { PostType } from '../types/types';

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const DELETE_POST = 'DELETE_POST';
const SET_USER_PHOTO = 'SAVE_USER_PHOTO';


const initialState =  {
  postsData: [
    {id: 1, postText: 'hello, its my first post', likesCount: 1 },
    {id: 2, postText: 'hello, how are you!', likesCount: 5 },
    {id: 3, postText: 'hello, how are you!', likesCount: 5 },
    {id: 4, postText: 'hello, how are you!', likesCount: 5 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: '',
  newPostText: ''
}

export type InitialState = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialState => {
  switch(action.type) {
    case ADD_POST:
      const newPost = {
        id: 5,
        postText: action.newPostText,
        likesCount: 0
      };
      return  {
        ...state,
        postsData: [...state.postsData, newPost],
        newPostText: ''
      }
    case DELETE_POST:
      return {
        ...state,
        postsData: state.postsData.filter(post => post.id !== action.postId)
      }
    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile
      };
    case SET_USER_STATUS:
      return {
        ...state,
        status: action.status
      }
    case SET_USER_PHOTO:
      debugger
      return {
        ...state,
        profile: {...state.profile, photos: action.photos} as ProfileType
      }
    default:
      return state;
  }

}
type AddPostActionCreator = {
  type: typeof ADD_POST;
  newPostText: string;
}
export const addPostActionCreator = (newPostText: string): AddPostActionCreator => ({
  type: ADD_POST,
  newPostText
}); 
type SetUserProfile = {
  type: typeof SET_USER_PROFILE;
  profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfile => ({
  type: SET_USER_PROFILE, profile
})
type SetUserStatus = {
  type: typeof SET_USER_STATUS;
  status: string
}
export const setUserStatus = (status: string): SetUserStatus => ({
  type: SET_USER_STATUS, status
})

type DeletePost = {
  type: typeof DELETE_POST;
  postId: number
}

export const deletePost = (postId: number): DeletePost => ({type: DELETE_POST, postId})

type SetUserPhoto = {
  type: typeof SET_USER_PHOTO;
  photos: PhotosType
}

export const setUserPhoto = (photos: PhotosType): SetUserPhoto => ({type: SET_USER_PHOTO, photos});


export const getUserProfile = (userId: number) => async (dispatch: any) => {
  const response = await usersAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
}

export const getUserStatus = (userId: number) => async (dispatch: any) => {
  const response = await profileAPI.getStatus(userId);
  dispatch(setUserStatus(response.data));

}
export const updateUserStatus = (status: string) => async (dispatch: any) => {
  const response = await profileAPI.updateStatus(status)
  if (response.data.resultCode === 0) {
    dispatch(setUserStatus(status))
  }
}

export const saveUserPhoto = (file: any) => async (dispatch: any) => {
  const response = await profileAPI.savePhoto(file)
  if (response.data.resultCode === 0) {
    dispatch(setUserPhoto(response.data.data.photos))
  }
}
export const saveUserProfile = (profileData: ProfileType) => async (dispatch: any, getState: any) => {
  const userId = getState().auth.userId;
  const data = await profileAPI.saveProfile(profileData)
  if (data.resultCode === 0) {
    dispatch(getUserProfile(userId));
  } else {
    dispatch(stopSubmit("profileDataForm", {_error: data.messages[0]}));
    return Promise.reject(data.messages[0]);
  }
}

export default profileReducer;
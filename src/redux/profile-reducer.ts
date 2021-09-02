import { ProfileType, PhotosType } from './../types/types';
import {profileAPI} from '../services/profile-api';
import {FormAction, stopSubmit} from "redux-form";
import {PostType} from '../types/types';
import { ResultCodes } from '../services/samurai.service';
import { BaseThunkType, InferActionsType } from './redux-store';

const initialState =  {
  postsData: [
    {id: 1, postText: 'hello, its my first post', likesCount: 1 },
    {id: 2, postText: 'hello, how are you!', likesCount: 5 },
    {id: 3, postText: 'hello, how are you!', likesCount: 5 },
    {id: 4, postText: 'hello, how are you!', likesCount: 5 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: ''
}

const profileReducer = (state = initialState, action: ActionsType): InitialState => {
  switch(action.type) {
    case 'PROFILE/ADD_POST':
      const newPost = {
        id: 5,
        postText: action.newPostText,
        likesCount: 0
      };
      return  {
        ...state,
        postsData: [...state.postsData, newPost]
      }
    case 'PROFILE/DELETE_POST':
      return {
        ...state,
        postsData: state.postsData.filter(post => post.id !== action.postId)
      }
    case 'PROFILE/SET_USER_PROFILE':
      return {
        ...state,
        profile: action.profile
      };
    case 'PROFILE/SET_USER_STATUS':
      return {
        ...state,
        status: action.status
      }
    case 'PROFILE/SET_USER_PHOTO':
      debugger
      return {
        ...state,
        profile: {...state.profile, photos: action.photos} as ProfileType
      }
    default:
      return state;
  }

}

export const actions = {
addPost: (newPostText: string) => ({type: 'PROFILE/ADD_POST', newPostText} as const),
deletePost: (postId: number) => ({type: 'PROFILE/DELETE_POST', postId} as const),
setUserProfile: (profile: ProfileType) => ({type: 'PROFILE/SET_USER_PROFILE', profile} as const),
setUserStatus: (status: string) => ({type: 'PROFILE/SET_USER_STATUS', status} as const),
setUserPhoto: (photos: PhotosType) => ({type: 'PROFILE/SET_USER_PHOTO', photos} as const)
}

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getProfile(userId);
  dispatch(actions.setUserProfile(data));
}

export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getStatus(userId);
  dispatch(actions.setUserStatus(data));

}
export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
  const data = await profileAPI.updateStatus(status) 
  if (data.resultCode === ResultCodes.Success) {
    dispatch(actions.setUserStatus(status))
  }
}

export const saveUserPhoto = (file: File): ThunkType => async (dispatch) => {
  const data = await profileAPI.savePhoto(file)
  if (data.resultCode === ResultCodes.Success) {
    dispatch(actions.setUserPhoto(data.data.photos))
  }
}
export const saveUserProfile = (profileData: ProfileType): ThunkType => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  const data = await profileAPI.saveProfile(profileData)
  if (data.resultCode === ResultCodes.Success) {
    if (userId !== null) {
      dispatch(getUserProfile(userId));
    }
  } else {
    dispatch(stopSubmit("profileDataForm", {_error: data.messages[0]}));
    return Promise.reject(data.messages[0]);
  }
}

export default profileReducer;

export type InitialState = typeof initialState;
type ActionsType = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;
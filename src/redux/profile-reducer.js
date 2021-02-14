import {profileAPI, usersAPI} from '../services/samurai.service';

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
  ],
  profile: null,
  status: ''
}

const profileReducer = (state = initialState, action) => {
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
        profile: {...state.profile, photos: action.photos}
      }
    default:
      return state;
  }

}

export const addPostActionCreator = (newPostText) => ({
  type: ADD_POST,
  newPostText
});

export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE, profile
})

export const setUserStatus = (status) => ({
  type: SET_USER_STATUS, status
})

export const deletePost = (postId) => ({type: DELETE_POST, postId})
export const setUserPhoto = (photos) => ({type: SET_USER_PHOTO, photos});
export const getUserProfile = (userId) => async (dispatch) => {
  const response = await usersAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
}

export const getUserStatus = (userId) => async (dispatch) => {
  const response = await profileAPI.getStatus(userId);
  dispatch(setUserStatus(response.data));

}
export const updateUserStatus = (status) => async (dispatch) => {
  const response = await profileAPI.updateStatus(status)
  if (response.data.resultCode === 0) {
    dispatch(setUserStatus(status))
  }
}

export const saveUserPhoto = (file) => async (dispatch) => {
  const response = await profileAPI.savePhoto(file)
  if (response.data.resultCode === 0) {
    dispatch(setUserPhoto(response.data.data.photos))
  }
}

export default profileReducer;
import { ProfileType } from './../types/types';
import axios from 'axios';

const  service = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    "API-KEY": "574e71bf-a2d7-431f-8989-10c71e3d5c62"
  }
})
export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return service.get(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => response.data);
  },
  followUser(userId: number) {
    return service.post(`follow/${userId}`)
      .then(response => response.data);
  },
  unfollowUser(userId: number) {
    return service.delete(`follow/${userId}`)
      .then(response => response.data);
  },
  getProfile(userId: number) {
    return profileAPI.getProfile(userId);
  }
}

export const profileAPI = {
  getProfile(userId: number) {
    return service.get(`profile/${userId}`);
  },
  getStatus(userId: number) {
    return service.get(`profile/status/${userId}`);
  },
  updateStatus(statusText: string) {
    return service.put(`profile/status`, {status: statusText});
  },
  savePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return service.put(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  saveProfile(profileData: ProfileType) {
    return service.put('profile', profileData).then(res => res.data);
  }
}

export enum ResultCodes {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10
} 

type AuthMe = {
  data: {id: number, email: string, login: string};
  resultCode: ResultCodes;
  messages: string[];
}

type Login = {
  data: {userId: number};
  resultCode: ResultCodes;
  messages: string[];
}
export const authAPI = {
  authMe() {
    return service.get<AuthMe>(`auth/me`).then(response => response.data);
  },
  login(email: string, password: string, rememberMe = false, captcha: null | string = "") {
    return service.post<Login>(`auth/login`, {email, password, rememberMe, captcha}).then(response => response.data);
  },
  logout() {
    return service.delete(`auth/login`);
  }
}

export const securityAPI = {
  getCaptchaUrl() {
    return service.get('security/get-captcha-url')
  }
}
import * as axios from 'axios';

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
  followUser(userId) {
    return service.post(`follow/${userId}`)
      .then(response => response.data);
  },
  unfollowUser(userId) {
    return service.delete(`follow/${userId}`)
      .then(response => response.data);
  },
  getProfile(userId) {
    return profileAPI.getProfile(userId);
  }
}

export const profileAPI = {
  getProfile(userId) {
    return service.get(`profile/${userId}`);
  },
  getStatus(userId) {
    return service.get(`profile/status/${userId}`);
  },
  updateStatus(statusText) {
    return service.put(`profile/status`, {status: statusText});
  }
}

export const authAPI = {
  authMe() {
    return service.get(`auth/me`).then(response => response.data);
  },
  login(email, password, rememberMe = false) {
    return service.post(`auth/login`, {email, password, rememberMe});
  },
  logout() {
    return service.delete(`auth/login`);
  }
}

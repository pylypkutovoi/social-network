import {GetItems, TResponse, service} from "./samurai.service";



export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
      return service.get<GetItems>(`users?page=${currentPage}&count=${pageSize}`)
        .then(res => res.data);
    },
    followUser(userId: number) {
      return service.post<TResponse>(`follow/${userId}`)
        .then(res => res.data);
    },
    unfollowUser(userId: number) {
      return service.delete<TResponse>(`follow/${userId}`)
        .then(res => res.data);
    }
  }
  
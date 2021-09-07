import {GetItems, TResponse, service} from "./samurai.service";



export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term = '', friend: null | boolean = null) {
      const isFriendNull = friend === null ? '' : `&friend=${friend}`;
      return service.get<GetItems>(`users?page=${currentPage}&count=${pageSize}&term=${term}${isFriendNull}`)
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
  
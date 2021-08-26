import {TResponse, service} from "./samurai.service";


type AuthMe = {
  id: number,
  email: string,
  login: string
}

type Login = {
  userId: number
}

export const authAPI = {
  authMe() {
    return service.get<TResponse<AuthMe>>(`auth/me`).then(res => res.data);
  },
  login(email: string, password: string, rememberMe = false, captcha: null | string = "") {
    return service.post<TResponse<Login>>(`auth/login`, {email, password, rememberMe, captcha}).then(res => res.data);
  },
  logout() {
    return service.delete(`auth/login`).then(res => res.data);
  }
}
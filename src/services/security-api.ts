import { service } from "./samurai.service"


type TCaptcha = {
  url: string
}
export const securityAPI = {
    getCaptchaUrl() {
      return service.get<TCaptcha>('security/get-captcha-url').then(res => res.data);
    }
  }
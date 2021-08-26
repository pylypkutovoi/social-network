import {TResponse, service} from "./samurai.service";
import { ProfileType, PhotosType } from './../types/types';

type SavePhotoData = {
  photos: PhotosType
}
export const profileAPI = {
  getProfile(userId: number) {
    return service.get<ProfileType>(`profile/${userId}`).then(res => res.data);
  },
  getStatus(userId: number) {
    return service.get<string>(`profile/status/${userId}`).then(res => res.data);
  },
  updateStatus(statusText: string) {
    return service.put<TResponse>(`profile/status`, {status: statusText}).then(res => res.data);
  },
  savePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return service.put<TResponse<SavePhotoData>>(`profile/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => res.data)
  },
  saveProfile(profileData: ProfileType) {
    return service.put('profile', profileData).then(res => res.data);
  }
}
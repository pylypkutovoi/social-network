import { UserType } from './../types/types';
import axios from 'axios';

export const  service = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    "API-KEY": "574e71bf-a2d7-431f-8989-10c71e3d5c62"
  }
})

export enum ResultCodes {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10
} 
export type TResponse<D = {}> = {
  data: D;
  messages: string[];
  resultCode: ResultCodes;
}

export type GetItems = {
  items: UserType[];
  totalCount: number;
  error: string | null;
}
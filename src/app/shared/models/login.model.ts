import { Acknowledgement } from './acknowledgement.model';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  acknowledgement: Acknowledgement;
  user: User
}

export interface User{
    _id :string;
    username:string;
    password:string;
    role: string;
    quota: number;
    post: string;
}
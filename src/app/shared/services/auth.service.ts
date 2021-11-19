import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginRequest, LoginResponse } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  public login(loginRequest: LoginRequest) {
    return this.http.post<LoginResponse>(
      `${this.baseUrl}/auth/login`,
      loginRequest
    );
  }

  public saveToken(id: string) {
    localStorage.setItem('token', `Bearer ${id}`);
  }

  public getToken() {
    return localStorage.getItem('token') ? localStorage.getItem('token') : '';
  }

  public logout() {
    localStorage.clear();
  }

  public validUser(): boolean {
    let result: boolean = localStorage.getItem('token') && localStorage.getItem('name') ? true : false;
    return result;
  }
}

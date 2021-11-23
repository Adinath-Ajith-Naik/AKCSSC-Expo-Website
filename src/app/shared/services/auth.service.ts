import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginRequest, LoginResponse } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  broadcastChannel = new BroadcastChannel('login');
  constructor(private http: HttpClient) {
  }

  public login(loginRequest: LoginRequest) {
    this.broadcastChannel.postMessage(true);
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
    this.broadcastChannel.postMessage(false);
    localStorage.clear();
  }

  public validUser(): boolean {
    if(localStorage.getItem('token') && localStorage.getItem('name')){
      this.broadcastChannel.postMessage(true);
     return true
    }
    else{
      this.broadcastChannel.postMessage(false);
     return false
    }
  }
}

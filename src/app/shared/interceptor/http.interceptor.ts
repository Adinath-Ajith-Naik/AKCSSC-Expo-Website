import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpAPIInterceptor implements HttpInterceptor {
  token: string = '';
  constructor(private authService: AuthService) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const loginReq = '/auth/login';

    if (request.url.search(loginReq) == -1) {
      let Fetchtoken = this.authService.getToken();
      this.token = Fetchtoken ? Fetchtoken : '';
      let httpReq = request.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: this.token,
        }),
      });
      return next.handle(httpReq);
    }
    return next.handle(request);
  }
}

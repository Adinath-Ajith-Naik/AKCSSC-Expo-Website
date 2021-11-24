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
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class HttpAPIInterceptor implements HttpInterceptor {
  token: string = '';
  constructor(private authService: AuthService,private router:Router, private spinner:NgxSpinnerService) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const loginReq = '/auth/login';
    const postReq ='/post';
    const catReq ='/category';
    const leaderboardReq ='/leaderboard';
    const likeAPI ='/post/like';
    const dislikeAPI ='/post/dislike';
    if ((request.url.search(loginReq) == -1 && request.url.search(postReq) == -1 && request.url.search(catReq) == -1 && request.url.search(leaderboardReq) == -1) || (request.url.search(dislikeAPI) != -1 || request.url.search(likeAPI)!= -1)) {
      if(this.authService.validUser()){
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
      else{
        this.authService.logout();
        this.router.navigate(['/sign-in']);
        this.spinner.hide();
      }
    }
    return next.handle(request);
  }
}

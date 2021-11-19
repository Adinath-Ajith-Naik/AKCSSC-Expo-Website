import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginRequest, LoginResponse, User } from 'src/app/shared/models/login.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  user: User = {} as User;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(
    private service: AuthService,
    private toast: ToastrService,
    private commonService: CommonService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public login(formData: LoginRequest) {
    this.service.login(formData).subscribe(
      (login: LoginResponse) => {
        if (login.acknowledgement.status === 'SUCCESS') {
          this.user = login.user;
          this.service.saveToken(this.user._id);
          this.commonService.saveUsername(this.user.username);
          this.user.role == 'admin' ? this.router.navigate(['/admin-panel']) :this.router.navigate(['/vote'])
        } else {
          this.toast.error(
            login.acknowledgement.message,
            login.acknowledgement.status
          );
        }
      },
      (err: HttpErrorResponse) => {
        this.toast.error(
          err.error.acknowledgement.message,
          err.error.acknowledgement.status
        );
      }
    );
  }
}

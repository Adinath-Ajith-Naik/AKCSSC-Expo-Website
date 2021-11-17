import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  

  constructor(
    private toast: ToastrService,
    private commonService: CommonService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.fetchAllPost();

  }


  public fetchAllPost(){
    //Fetch All Post
    this.commonService.getPost().subscribe(
      (fetchAllPost:any) => {
        if(fetchAllPost.acknowledgement.status === 'SUCCESS'){

        }else{
          this.toast.error(
            fetchAllPost.acknowledgement.message,
            fetchAllPost.acknowledgement.status,
          );
        }
      },
      (err: HttpErrorResponse) => {
        this.toast.error(
          err.error.acknowledgement.message,
          err.error.acknowledgement.status
        );
      }
    )
  }
}

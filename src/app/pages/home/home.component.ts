import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { GetPostResponse, Post } from 'src/app/shared/models/post.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { CreatePostComponent } from '../admin-panel/posts/create-post/create-post.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  postsLoading: boolean = true;
  posts: Post[] = [] as Post[];
  // modalRef?: BsModalRef

  constructor(
    private toast: ToastrService,
    private commonService: CommonService,
    private router:Router,
    private spinner: NgxSpinnerService
    // private modalService:BsModalService
  ) { }

  ngOnInit(): void {
    this.fetchAllPost();

  }

  // openModal() {
  //   this.modalRef = this.modalService.show(CreatePostComponent);
  //   this.modalRef.onHide?.subscribe((event)=>{
  //     this.fetchAllPost();
      
  //   })
  // }

  public fetchAllPost(){
    //Fetch All Post
    this.spinner.show();
    this.commonService.getPost().subscribe(
      (fetchAllPost:GetPostResponse) => {
        if(fetchAllPost.acknowledgement.status === 'SUCCESS'){
          this.posts = fetchAllPost.posts;
          this.postsLoading = false;
          this.spinner.hide();
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

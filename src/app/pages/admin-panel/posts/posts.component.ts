import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { createPostResponse, updatePostResponse } from 'src/app/shared/models/post.model';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  postForm: FormGroup = new FormGroup({
    startupname: new FormControl(''),
    logo: new FormControl(''),
    category: new FormControl(''),
    caption: new FormControl(''),
    image: new FormControl(''),
  })

  constructor(
    private toast: ToastrService,
    private commonService: CommonService,
    private router: Router
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

  //Fetch Post By ID

  public fetchPostById(){
    this.commonService.getSinglePost().subscribe(
      (fetchPostById:any) => {
        if(fetchPostById.acknowledgement.status === 'SUCCESS'){

        }else{
          this.toast.error(
            fetchPostById.acknowledgement.message,
            fetchPostById.acknowledgement.status,
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

  // Create Post

  public createPost(values:any){
    //Fetch All Post
    this.commonService.createPost(values).subscribe(
      (createPost:createPostResponse) => {
        if(createPost.acknowledgement.status === 'SUCCESS'){

        }else{
          this.toast.error(
            createPost.acknowledgement.message,
            createPost.acknowledgement.status,
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

  // Update Post

  public updatePost(values:any){
    this.commonService.updateCategory(values).subscribe(
      (updatePost:updatePostResponse) => {
        if(updatePost.acknowledgement.status === 'SUCCESS'){
          //Updated Category
        }else{
          this.toast.error(
            updatePost.acknowledgement.message,
            updatePost.acknowledgement.status
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

  // Delete Post

  public deletePost(){
    //delete catergery
    this.commonService.deletePost().subscribe(
      (deletePost:any) => {
        if(deletePost.acknowledgement.status === 'SUCCESS'){

        }else{
          this.toast.error(
            deletePost.acknowledgement.message,
            deletePost.acknowledgement.status
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

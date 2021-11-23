import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonResponse } from 'src/app/shared/models/acknowledgement.model';
import {
  Category,
  GetCategoryResponse,
} from 'src/app/shared/models/category.model';
import { User } from 'src/app/shared/models/login.model';
import { GetPostResponse, LikeStatus, LikeStatusResponse, Post } from 'src/app/shared/models/post.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { ViewPostComponent } from '../admin-panel/posts/view-post/view-post.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  postsLoading: boolean = true;
  posts: Post[] = [] as Post[];
  modalRef?: BsModalRef;
  signIn: boolean = false;
  toggler: boolean = false;
  selectedFilter: string[] = [] as string[];
  fetchPost: Post[] = [] as Post[];
  categories: Category[] = [] as Category[];
  user: User = {} as User;
  LikePrivilege: LikeStatus = {} as LikeStatus;
  liking: boolean = false;
  role: string | null = null;
  constructor(
    private toast: ToastrService,
    private commonService: CommonService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('role')
    this.getCategory();
    this.fetchAllPost();
    this.signIn = this.authService.validUser();
    if (this.signIn) {
      this.fetchUserLikes();
    }
  }

  fetchUserLikes() {
    this.commonService.likeStatus().subscribe((res: LikeStatusResponse) => {
      this.LikePrivilege = res.data;
      console.log(this.LikePrivilege);
    }, (err: HttpErrorResponse) => {
      console.warn(err);
    })
  }

  doubleClick() {
    this.toast.warning("Double click is not allowed!", "Sorry!")
  }

  likePost(id: string) {
    this.liking = true;
    this.commonService.likeStatus().subscribe((res: LikeStatusResponse) => {
      if (res.data.quota === 1) {
        this.commonService.likePost(id).subscribe((res: CommonResponse) => {
          this.fetchUserLikes();
          this.fetchAllPost();
          this.liking = false;
        }, (err: HttpErrorResponse) => {
          console.warn(err);
          this.liking = false;
        })
      }
      else{
        this.toast.error("Cannot like this post! Please unlike all the post and try again.", "you're out of likes!")
      }
    }, (err: HttpErrorResponse) => {
      console.warn(err);
      this.liking = false;
    })

  }


  dislikePost(id: string) {
    this.liking = true;
    this.commonService.likeStatus().subscribe((res: LikeStatusResponse) => {
      if (res.data.quota === -1) {
        this.commonService.dislikePost(id).subscribe((res: CommonResponse) => {
          this.fetchUserLikes();
          this.fetchAllPost();
          this.liking = false;
        }, (err: HttpErrorResponse) => {
          console.warn(err);
          this.liking = false;
        })
      }
      else{
        this.toast.error("Cannot unlike this post!", "Something went wrong!")
      }
    }, (err: HttpErrorResponse) => {
      console.warn(err);
      this.liking = false;
    })

  }

  openPostModal(post: Post) {
    let modalOptions: ModalOptions = {
      initialState: {
        post: post,
      },
      class: 'modal-lg',
    };
    this.modalRef = this.modalService.show(ViewPostComponent, modalOptions);
  }

  toggleFilters() {
    this.toggler = !this.toggler;
  }

  selectFilter(value: string) {
    this.spinner.show();
    this.posts = [];
    this.selectedFilter.includes(value)
      ? this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1)
      : this.selectedFilter.push(value);
    if (this.selectedFilter.length) {
      this.posts = this.fetchPost.filter((post) =>
        this.selectedFilter.includes(post.category)
      );
    } else {
      this.posts = this.fetchPost;
    }
    this.spinner.hide();
  }

  public getCategory() {
    this.commonService.getCategory().subscribe(
      (result: GetCategoryResponse) => {
        if (result.acknowledgement.status === 'SUCCESS') {
          this.categories = result.category;
          this.categories.forEach((category) => {
            category.selected = false;
          });
        } else {
          this.toast.error(
            result.acknowledgement.message,
            result.acknowledgement.status
          );
        }
      },
      (err: HttpErrorResponse) => {
        console.warn(err);
        this.toast.error(
          err.error.acknowledgement.message,
          err.error.acknowledgement.status
        );
      }
    );
  }

  public fetchAllPost() {
    //Fetch All Post
    this.spinner.show();
    this.selectedFilter = [];
    this.commonService.getPost().subscribe(
      (fetchAllPost: GetPostResponse) => {
        if (fetchAllPost.acknowledgement.status === 'SUCCESS') {
          this.fetchPost = fetchAllPost.posts;
          this.posts = fetchAllPost.posts;
          this.postsLoading = false;
          this.spinner.hide();
        } else {
          this.toast.error(
            fetchAllPost.acknowledgement.message,
            fetchAllPost.acknowledgement.status
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

  //   public async likePost(postId: string) {
  //     this.user = JSON.parse(this.fetchUser());
  //     let like:number = 0;
  //     if( this.user.quota == 1){
  //       like = 1;
  //       this.user.quota = -1;
  //       await this.liker(postId,like)
  //     }
  //     else if(this.user.post === postId){
  //       like = -1;
  //       this.user.quota = 1;
  //       await this.liker(postId,like)
  //     }
  //     else{
  //       this.toast.error("You can only like one Post.Please unlike liked post to continue","Cannot LIke");
  //     }
  //   }

  //   liker(postId:string, like:number){
  //     this.commonService.likePost(postId, like).subscribe(
  //       (res: CommonResponse) => {
  //         if(res.acknowledgement.status === 'SUCCESS'){
  //           this.toast.success(
  //             res.acknowledgement.message,
  //             res.acknowledgement.status
  //           )
  //           localStorage.setItem('data',JSON.stringify(this.user));
  //         }
  //         else{
  //           this.toast.error(
  //             res.acknowledgement.message,
  //             res.acknowledgement.status
  //           );
  //         }
  //       },
  //       (err: HttpErrorResponse) => {
  //         console.warn(err);
  //         this.toast.error(
  //           err.error.acknowledgement.message,
  //           err.error.acknowledgement.status
  //         );
  //       }
  //     );
  //   }
}

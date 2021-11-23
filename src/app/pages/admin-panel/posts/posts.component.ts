import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonResponse } from 'src/app/shared/models/acknowledgement.model';
import {
  Category,
  GetCategoryResponse,
} from 'src/app/shared/models/category.model';
import {
  CreatePostResponse,
  GetPostResponse,
  Post,
} from 'src/app/shared/models/post.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { CreatePostComponent } from './create-post/create-post.component';
import { ViewPostComponent } from './view-post/view-post.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  postsLoading: boolean = true;
  posts: Post[] = [] as Post[];
  fetchPost: Post[] = [] as Post[];
  modalRef?: BsModalRef;
  categories: Category[] = [] as Category[];
  toggler: boolean = false;
  selectedFilter: string[] = [] as string[];
  constructor(
    private toast: ToastrService,
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getCategory();
    this.fetchAllPost();
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

  openModal() {
    this.modalRef = this.modalService.show(CreatePostComponent);
    this.modalRef.onHide?.subscribe((event) => {
      this.fetchAllPost();
    });
  }

  openUpdatePostModal(post: Post) {
    let modalOptions: ModalOptions = {
      initialState: {
        updatePost: post,
      },
    };
    this.modalRef = this.modalService.show(CreatePostComponent, modalOptions);
    this.modalRef.onHide?.subscribe((event) => {
      this.fetchAllPost();
    });
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
          this.postsLoading = false;
          this.spinner.hide();
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

  //Fetch Post By ID

  public fetchPostById() {
    this.commonService.getSinglePost().subscribe(
      (fetchPostById: any) => {
        if (fetchPostById.acknowledgement.status === 'SUCCESS') {
        } else {
          this.toast.error(
            fetchPostById.acknowledgement.message,
            fetchPostById.acknowledgement.status
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

  // Delete Post

  public deletePost(_id: string) {
    //delete catergery
    this.commonService.deletePost(_id).subscribe(
      (deletePost: CommonResponse) => {
        if (deletePost.acknowledgement.status === 'SUCCESS') {
          this.toast.success(
            deletePost.acknowledgement.message,
            deletePost.acknowledgement.status
          );
          this.fetchAllPost();
        } else {
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
    );
  }

  toggleFilters() {
    this.toggler = !this.toggler;
  }

  selectFilter(value: string) {
    this.spinner.show();
    this.posts = [];
    this.selectedFilter.includes(value)?this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1) : this.selectedFilter.push(value)
    if(this.selectedFilter.length){
      this.posts = this.fetchPost.filter(post=>this.selectedFilter.includes(post.category))

    }else{
      this.posts = this.fetchPost;
    }
    this.spinner.hide();



    // value.selected = !value.selected;
    // if(!value.selected){
    //   this.selectedFilter.splice(this.selectedFilter.indexOf(value.category), 1);
    // } else {
    //   this.selectedFilter.push(value.category);
    // }
    // if (
    //   this.selectedFilter.length < 1 ||
    //   !this.selectedFilter.length ||
    //   !this.selectedFilter
    // ) {
    //   this.filteredPosts = this.posts;
    // } else {
    //   this.filteredPosts = [];
    //   this.posts.map((post) => {
    //     if (this.selectedFilter.includes(post._id[0])) {
    //       var tempPost: Post = post;
    //       this.filteredPosts.push(tempPost);
    //     }
    //   });
    // }
  }
}

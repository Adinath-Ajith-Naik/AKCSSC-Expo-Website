import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonResponse } from 'src/app/shared/models/acknowledgement.model';
import {
  Category,
  GetCategoryResponse,
} from 'src/app/shared/models/category.model';
import {
  CreatePostRequest,
  CreatePostResponse,
  Post,
} from 'src/app/shared/models/post.model';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup = new FormGroup({
    startupname: new FormControl(''),
    logo: new FormControl(''),
    category: new FormControl(''),
    caption: new FormControl(''),
    image: new FormControl(''),
  });
  categories: Category[] = [] as Category[];
  imageLogoUrl: string = '';
  imageUrl: string = '';
  firebaseImageUrl: string = '';
  firebaseLogoUrl: string = '';
  task?: AngularFireUploadTask;
  updatePost: Post = {} as Post;
  lengthVariable: string = '';

  get caption() {
    return this.postForm.get('caption');
  }
  get startupname() {
    return this.postForm.get('startupname');
  }
  get image() {
    return this.postForm.get('image');
  }
  get logo() {
    return this.postForm.get('logo');
  }
  get category() {
    return this.postForm.get('category');
  }

  constructor(
    private toast: ToastrService,
    private commonService: CommonService,
    public modalRef: BsModalRef,
    private spinner: NgxSpinnerService,
    private fireStorage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.lengthVariable = this.updatePost?.caption
      ? this.updatePost?.caption
      : '';
    this.getCategory();
    this.postForm = new FormGroup({
      startupname: new FormControl(
        this.updatePost.startup ? this.updatePost.startup : '',
        [Validators.required]
      ),
      caption: new FormControl(
        this.updatePost.caption ? this.updatePost.caption : 'dlshfhfsdl',
        [Validators.required]
      ),
      image: new FormControl('', [Validators.required]),
      logo: new FormControl(''),
      category: new FormControl(
        this.updatePost.category ? this.updatePost.category : '',
        [Validators.required]
      ),
    });
  }

  uploadImage(event: any) {
    this.imageUrl = event.target.files[0];
  }
  uploadLogoImage(event: any) {
    this.imageLogoUrl = event.target.files[0];
  }

  public getCategory() {
    this.commonService.getCategory().subscribe(
      (result: GetCategoryResponse) => {
        if (result.acknowledgement.status === 'SUCCESS') {
          this.categories = result.category;
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

  public async uploadtoFB(startupname: string) {
    await this.uploadImageToFirebase(
      this.imageUrl,
      `posts/${startupname}`
    ).then((imageUrl) => {
      this.firebaseImageUrl = imageUrl;
    });
    await this.uploadImageToFirebase(
      this.imageLogoUrl,
      `logos/${startupname}`
    ).then((imageUrl) => {
      this.firebaseLogoUrl = imageUrl;
    });
  }

  public createPost(values: any) {
    this.spinner.show();
    let createPostRequest: CreatePostRequest = {} as CreatePostRequest;
    let post: Post = {} as Post;
    post.startup = values.startupname;
    post.category = values.category;
    post.caption = this.lengthVariable;
    post.likes = 0;
    this.uploadtoFB(values.startupname).then(() => {
      post.media = this.firebaseImageUrl;
      post.startupImage = this.firebaseLogoUrl;
      createPostRequest.post = post;
      this.commonService.createPost(createPostRequest).subscribe(
        (createPost: CreatePostResponse) => {
          if (createPost.acknowledgement.status === 'SUCCESS') {
            this.toast.success(
              createPost.acknowledgement.message,
              createPost.acknowledgement.status
            );
            this.modalRef.hide();
            this.spinner.hide();
          } else {
            this.spinner.show();
            this.toast.error(
              createPost.acknowledgement.message,
              createPost.acknowledgement.status
            );
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
    });
  }

  public async uploadImageToFirebase(image: string, filename: string) {
    if (image && image !== '') {
      this.task = this.fireStorage.upload(filename, image);
      const ref = this.fireStorage.ref(filename);
      await this.task;
      let firebaseImageUrl = await ref.getDownloadURL().toPromise();
      return firebaseImageUrl;
    } else {
      this.toast.error(
        'Image cannot be uploaded to Firebase',
        'Please check the Image.'
      );
      return null;
    }
  }

  public updatePostFucntion(values: any) {
    this.spinner.show();
    let updatePostRequest: CreatePostRequest = {} as CreatePostRequest;
    let post: Post = {} as Post;
    post.startup = values.startupname;
    post.category = values.category;
    post.caption = this.lengthVariable;
    post.likes = 0;
    this.uploadtoFB(values.startupname).then(() => {
      post.media = this.firebaseImageUrl;
      post.startupImage = this.firebaseLogoUrl;
      updatePostRequest.post = post;
      this.commonService.updatePostFunction(updatePostRequest,this.updatePost._id).subscribe(
        (createPost: CommonResponse) => {
          if (createPost.acknowledgement.status === 'SUCCESS') {
            this.toast.success(
              createPost.acknowledgement.message,
              createPost.acknowledgement.status
            );
            this.modalRef.hide();
            this.spinner.hide();
          } else {
            this.toast.error(
              createPost.acknowledgement.message,
              createPost.acknowledgement.status
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
    });
  }
}

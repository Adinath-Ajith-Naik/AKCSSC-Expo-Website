import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
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
    private fireStorage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.getCategory();
    this.postForm = new FormGroup({
      startupname: new FormControl('', [Validators.required]),
      caption: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      logo: new FormControl(''),
      category: new FormControl('', [Validators.required]),
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
      console.log(imageUrl);
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
    let createPostRequest: CreatePostRequest = {} as CreatePostRequest;
    let post: Post = {} as Post;
    post.startup = values.startupname;
    post.Category = values.category;
    post.caption = values.caption;
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
}

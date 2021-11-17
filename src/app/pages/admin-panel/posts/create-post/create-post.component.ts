import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { CreatePostResponse } from 'src/app/shared/models/post.model';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  postForm: FormGroup = new FormGroup({
    startupname: new FormControl(''),
    logo: new FormControl(''),
    category: new FormControl(''),
    caption: new FormControl(''),
    image: new FormControl(''),
  });

  constructor(
    private toast: ToastrService,
    private commonService: CommonService,
    public modalRef: BsModalRef

  ) { }

  ngOnInit(): void {
  }

  public createPost(values: any) {
    //Fetch All Post
    this.commonService.createPost(values).subscribe(
      (createPost: CreatePostResponse) => {
        if (createPost.acknowledgement.status === 'SUCCESS') {
          this.toast.success(createPost.acknowledgement.message,
            createPost.acknowledgement.status);
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
  }
}

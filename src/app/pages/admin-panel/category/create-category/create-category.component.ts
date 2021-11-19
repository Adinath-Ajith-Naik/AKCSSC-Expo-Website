import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonResponse } from 'src/app/shared/models/acknowledgement.model';
import {
  Category,
  CreateCategoryRequest,
  GetCategoryResponse,
} from 'src/app/shared/models/category.model';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnInit {
  Updatecategory: Category = {} as Category;
  categories: Category[] = [] as Category[];
  categoryForm: FormGroup = new FormGroup({
    category: new FormControl(''),
  });

  constructor(
    private toast: ToastrService,
    private commonService: CommonService,
    public modalRef: BsModalRef,
    private spinner:NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      category: new FormControl(this.Updatecategory.category ? this.Updatecategory.category : '', [Validators.required]),
    });
  }
  get category() {
    return this.categoryForm.get('category');
  }

  public createCategory(values: any) {
    //create api
    this.spinner.show();
    this.commonService.createCategory(values).subscribe(
      (createCategory: GetCategoryResponse) => {
        if (createCategory.acknowledgement.status === 'SUCCESS') {
          //Category added
          this.toast.success(
            createCategory.acknowledgement.message,
            createCategory.acknowledgement.status
          );
          this.modalRef.hide();
          this.spinner.hide();
        } else {
          this.spinner.show();
          this.toast.error(
            createCategory.acknowledgement.message,
            createCategory.acknowledgement.status
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
  }

  public updateCategoryFucntion(category : CreateCategoryRequest){
    this.spinner.show();
    this.commonService.updateCategoryFunction(category,this.Updatecategory._id).subscribe(
      (updateCategoryResponse: CommonResponse) => {
        if (updateCategoryResponse.acknowledgement.status === 'SUCCESS') {
          this.toast.success(
            updateCategoryResponse.acknowledgement.message,
            updateCategoryResponse.acknowledgement.status
          );
          this.modalRef.hide();
          this.spinner.hide();
        } else {
          this.spinner.show();
          this.toast.error(
            updateCategoryResponse.acknowledgement.message,
            updateCategoryResponse.acknowledgement.status
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
    
  }
}

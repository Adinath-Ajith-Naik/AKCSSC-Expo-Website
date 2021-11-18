import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CommonResponse } from 'src/app/shared/models/acknowledgement.model';
import {
  Category,
  GetCategoryResponse,
} from 'src/app/shared/models/category.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { CreateCategoryComponent } from './create-category/create-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [] as Category[];
  categoryForm: FormGroup = new FormGroup({
    category: new FormControl(''),
  });
  modalRef?: BsModalRef;

  constructor(
    //service inject
    private toast: ToastrService,
    private commonService: CommonService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.fetchAllCategory();
  }

  openModal() {
    this.modalRef = this.modalService.show(CreateCategoryComponent);
    this.modalRef.onHide?.subscribe((event) => {
      this.fetchAllCategory();
    });
  }

  openUpdateModal(category: Category) {
    let modalOptions: ModalOptions = {
      initialState:{
        Updatecategory: category,
      }
    };
    this.modalRef = this.modalService.show(CreateCategoryComponent, modalOptions);
    this.modalRef.onHide?.subscribe((event) => {
      this.fetchAllCategory();
    });
  }

  public fetchAllCategory() {
    //fetch all catergery
    this.spinner.show();
    this.commonService.getCategory().subscribe(
      (fetchAllCategory: GetCategoryResponse) => {
        if (fetchAllCategory.acknowledgement.status === 'SUCCESS') {
          this.categories = fetchAllCategory.category;
          console.log(this.categories);
          console.log(fetchAllCategory);

          this.spinner.hide();
        } else {
          this.toast.error(
            fetchAllCategory.acknowledgement.message,
            fetchAllCategory.acknowledgement.status
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

  public fetchCategoryById() {
    //fetch by id

    this.commonService.getSinglePost().subscribe(
      (fetchCategoryById: any) => {
        if (fetchCategoryById.acknowledgement.status === 'SUCCESS') {
        } else {
          this.toast.error(
            fetchCategoryById.acknowledgement.message,
            fetchCategoryById.acknowledgement.status
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

  public createCategory(values: any) {
    //create api
    this.commonService.createCategory(values).subscribe(
      (createCategory: GetCategoryResponse) => {
        if (createCategory.acknowledgement.status === 'SUCCESS') {
          //Category added
        } else {
          this.toast.error(
            createCategory.acknowledgement.message,
            createCategory.acknowledgement.status
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

  //update

  public updateCategory(values: any) {
    this.commonService.updateCategory(values).subscribe(
      (updateCategory: CommonResponse) => {
        if (updateCategory.acknowledgement.status === 'SUCCESS') {
          //Updated Category
        } else {
          this.toast.error(
            updateCategory.acknowledgement.message,
            updateCategory.acknowledgement.status
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

  public deleteCategory(id: string) {
    //delete catergery
    this.commonService.deleteCategory(id).subscribe(
      (deleteCategory: any) => {
        if (deleteCategory.acknowledgement.status === 'SUCCESS') {
          this.fetchAllCategory();
        } else {
          this.toast.error(
            deleteCategory.acknowledgement.message,
            deleteCategory.acknowledgement.status
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

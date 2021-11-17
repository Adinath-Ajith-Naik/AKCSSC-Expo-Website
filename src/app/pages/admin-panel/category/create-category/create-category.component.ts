import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Category, GetCategoryResponse } from 'src/app/shared/models/category.model';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  categories: Category[] = [] as Category[];
  categoryForm: FormGroup = new FormGroup({
    category: new FormControl(''),
    
  });

  constructor(
    private toast: ToastrService,
    private commonService: CommonService,
    public modalRef: BsModalRef
  ) { }

  ngOnInit(): void {
  }

  public createCategory(values: any) {
    //create api
    this.commonService.createCategory(values).subscribe(
      (createCategory: GetCategoryResponse) => {
        if (createCategory.acknowledgement.status === 'SUCCESS') {
          //Category added
          this.toast.success(createCategory.acknowledgement.message,
            createCategory.acknowledgement.status);
            this.modalRef.hide();
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
}

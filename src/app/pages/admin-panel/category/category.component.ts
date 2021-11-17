import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { createCategoryResponse, getCategoryResponse, updateCategoryResponse } from 'src/app/shared/models/category.model';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryForm: FormGroup = new FormGroup({
    categoryName: new FormControl('')
  })

  constructor(
    //service inject
    private toast: ToastrService,
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchAllCategory();
  }

  public fetchAllCategory(){
    //fetch all catergery
    this.commonService.getCategory().subscribe(
      (fetchAllCategory:any) => {
        if(fetchAllCategory.acknowledgement.status === 'SUCCESS'){

        }else{
          this.toast.error(
            fetchAllCategory.acknowledgement.message,
            fetchAllCategory.acknowledgement.status
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

  public fetchCategoryById(){
    //fetch by id

    this.commonService.getSinglePost().subscribe(
      (fetchCategoryById:any) => {
        if(fetchCategoryById.acknowledgement.status === 'SUCCESS'){

        }else{
          this.toast.error(
            fetchCategoryById.acknowledgement.message,
            fetchCategoryById.acknowledgement.status,
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

  public createCategory(values: any){
    //create api
    this.commonService.createCategory(values).subscribe(
      (createCategory:createCategoryResponse) => {
        if(createCategory.acknowledgement.status === 'SUCCESS'){
            //Category added
        }else{
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
    )

  }

  //update

  public updateCategory(values:any){
    this.commonService.updateCategory(values).subscribe(
      (updateCategory:updateCategoryResponse) => {
        if(updateCategory.acknowledgement.status === 'SUCCESS'){
          //Updated Category
        }else{
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
    )
  }

  
  public deleteCategory(){
    //delete catergery
    this.commonService.deleteCategory().subscribe(
      (deleteCategory:any) => {
        if(deleteCategory.acknowledgement.status === 'SUCCESS'){

        }else{
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
    )
  }


}

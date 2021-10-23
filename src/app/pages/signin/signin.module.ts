import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    SigninModule
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SigninModule { }

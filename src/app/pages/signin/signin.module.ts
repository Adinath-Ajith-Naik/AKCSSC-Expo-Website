import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SigninComponent } from './signin.component';

const routes: Routes = [
  { path: '', component: SigninComponent }
]

@NgModule({
  declarations: [
    SigninComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class SigninModule { }

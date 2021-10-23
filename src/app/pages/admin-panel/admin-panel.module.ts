import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { PostsComponent } from './posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CategoryComponent,
    PostsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AdminPanelModule { }

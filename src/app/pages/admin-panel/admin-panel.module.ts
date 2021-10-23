import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { PostsComponent } from './posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminPanelComponent } from './admin-panel.component';

const routes: Routes = [
  { path: '', component: AdminPanelComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'uploads', component: PostsComponent }
]
@NgModule({
  declarations: [
    AdminPanelComponent,
    CategoryComponent,
    PostsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class AdminPanelModule { }
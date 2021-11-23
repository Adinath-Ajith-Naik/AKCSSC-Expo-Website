import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { PostsComponent } from './posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminPanelComponent } from './admin-panel.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { ViewPostComponent } from './posts/view-post/view-post.component';


const routes: Routes = [
  { path: '', component: AdminPanelComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'uploads', component: PostsComponent },
  { path: 'view-post', component: ViewPostComponent },
];
@NgModule({
  declarations: [
    AdminPanelComponent,
    CategoryComponent,
    PostsComponent,
    CreatePostComponent,
    CreateCategoryComponent,
    ViewPostComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class AdminPanelModule {}

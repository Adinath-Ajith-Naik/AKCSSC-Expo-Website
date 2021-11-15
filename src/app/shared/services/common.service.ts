import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Acknowledgement } from '../models/acknowledgement.model';
import { createCategoryRequest, createCategoryResponse, updateCategoryRequest, updateCategoryResponse } from '../models/category.model';
import { createPostRequest, createPostResponse, deletePostResponse, getPostResponse, getSinglePostResponse, updatePostRequest, updatePostResponse } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
private baseUrl = environment.baseUrl

  constructor(
    private http:HttpClient
  ) { }

  
  public saveUsername(name: string) {
    localStorage.setItem('name', name);
  }

  
  
  //Category

  public createCategory(createCategoryRequest:createCategoryRequest)
  {
    return this.http.post<createCategoryResponse>(`${this.baseUrl}/category`,createCategoryRequest);

  }

  public getCategory()
  {
    return this.http.get(`${this.baseUrl}/category`);

  }

  public updateCategory(updateCategoryRequest:updateCategoryRequest)
  {
    return this.http.put<updateCategoryResponse>(`${this.baseUrl}/category/:id`,updateCategoryRequest);

  }
  
  public deleteCategory()
  {
    return this.http.delete(`${this.baseUrl}/category/:id`);

  }

  // Post

  public createPost(createPostRequest:createPostRequest){
    return this.http.post<createPostResponse>(`${this.baseUrl}/post`,createPostRequest)
  }

  public getPost(){
    return this.http.get<getPostResponse>(`${this.baseUrl}/post`)
  }

  public getSinglePost(){
    return this.http.get<getSinglePostResponse>(`${this.baseUrl}/post`)
  }

  public updatePost(updatePostRequest:updatePostRequest){
    return this.http.put<updatePostResponse>(`${this.baseUrl}/post`,updatePostRequest)
  } 

  public deletePost(){
    return this.http.delete<deletePostResponse>(`${this.baseUrl}/post`)

  }

  
}

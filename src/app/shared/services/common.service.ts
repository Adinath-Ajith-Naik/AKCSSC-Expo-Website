import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  Acknowledgement,
  CommonResponse,
} from '../models/acknowledgement.model';
import {
  CreateCategoryRequest,
  GetCategoryResponse,
} from '../models/category.model';
import {
  CreatePostRequest,
  CreatePostResponse,
  GetPostResponse,
  GetSinglePostResponse,
  LikeStatusResponse,
} from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  public saveUsername(name: string) {
    localStorage.setItem('name', name);
  }

  //Category

  public createCategory(createCategoryRequest: CreateCategoryRequest) {
    return this.http.post<GetCategoryResponse>(
      `${this.baseUrl}/category`,
      createCategoryRequest
    );
  }

  public getCategory() {
    return this.http.get<GetCategoryResponse>(`${this.baseUrl}/category`);
  }

  public updateCategoryFunction(
    updateCategoryRequest: CreateCategoryRequest,
    id: string
  ) {
    return this.http.put<CommonResponse>(
      `${this.baseUrl}/category/${id}`,
      updateCategoryRequest
    );
  }

  public deleteCategory(id: string) {
    return this.http.delete(`${this.baseUrl}/category/${id}`);
  }

  // Post

  public createPost(createPostRequest: CreatePostRequest) {
    return this.http.post<CreatePostResponse>(
      `${this.baseUrl}/post`,
      createPostRequest
    );
  }

  public getPost() {
    return this.http.get<GetPostResponse>(`${this.baseUrl}/post`);
  }

  public getSinglePost() {
    return this.http.get<GetSinglePostResponse>(`${this.baseUrl}/post`);
  }

  public updatePostFunction(updatePostRequest: CreatePostRequest, id: string) {
    return this.http.put<CommonResponse>(
      `${this.baseUrl}/post/${id}`,
      updatePostRequest
    );
  }

  public deletePost(id: string) {
    return this.http.delete<CommonResponse>(`${this.baseUrl}/post/${id}`);
  }

  //likes

  public likeStatus(){
    return this.http.get<LikeStatusResponse>(`${this.baseUrl}/likeStatus`);
  }

  public likePost(id:string){
    return this.http.patch<CommonResponse>(`${this.baseUrl}/post/like/${id}`,{});
  }

  public dislikePost(id:string){
    return this.http.patch<CommonResponse>(`${this.baseUrl}/post/dislike/${id}`,{});
  }

  // public likePost(id: string,like:number) {
  //   let httpParams = new HttpParams();
  //   httpParams = httpParams.append('like',like);
  //   return this.http.patch<CommonResponse>(`${this.baseUrl}/post/like/${id}`,{params:httpParams});
  // }

  //leaderboard

  public leaderboard(){
    return this.http.get<CommonResponse>(`${this.baseUrl}/leaderboard`);
  }
}

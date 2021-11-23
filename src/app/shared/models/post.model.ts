import { Acknowledgement } from './acknowledgement.model';

export interface CreatePostRequest {
  post: Post;
}

export interface Post {
  _id: string;
  startup: string;
  startupImage: String;
  caption: string;
  media: string;
  likes: number;
  category: string;
}

export interface CreatePostResponse {
  acknowledgement: Acknowledgement;
  post: Post;
}

export interface GetPostResponse {
  acknowledgement: Acknowledgement;
  posts: Post[];
}

export interface GetSinglePostResponse {
  acknowledgement: Acknowledgement;
  post: Post[];
}


export interface LikeStatusResponse {
  acknowledgement: Acknowledgement;
  data: LikeStatus;
}


export interface LikeStatus {
  _id: string;
  quota: number;
  post: string;
}

import { Acknowledgement } from './acknowledgement.model';

export interface CreatePostRequest {
  post: Post;
}

export interface Post {
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



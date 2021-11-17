import { Acknowledgement } from "./acknowledgement.model";

export interface createPostRequest{
    post:post;
}

export interface post{
    startup:string,
    startupImage:String,
    caption:string,
    media:string,
    likes:number,
    Category:string
}

export interface createPostResponse{
    acknowledgement:Acknowledgement,
    post:post;
}

export interface getPostResponse{
    acknowledgement:Acknowledgement;
    post:post;
}

export interface getSinglePostResponse{
    acknowledgement:Acknowledgement;
    post:post[];
}

export interface updatePostRequest{
    post:post;
}

export interface updatePostResponse{
    acknowledgement:Acknowledgement;
}

export interface deletePostResponse{
    acknowledgement:Acknowledgement;
}

 
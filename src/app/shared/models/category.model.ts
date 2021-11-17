import { Acknowledgement } from "./acknowledgement.model";

export interface createCategoryRequest{
    category:string;
}

export interface createCategoryResponse{
    acknowledgement:Acknowledgement;
    category:Category[];
}

export interface Category{
    _id:string;
    category:string;  
}

export interface getCategoryResponse{
    acknowledgement:Acknowledgement;
    categories:Category[];
}

export interface updateCategoryRequest{
    category:string;
}

export interface updateCategoryResponse{
    acknowledgement:Acknowledgement;
}

export interface deleteCategoryResponse{
    acknowledgement:Acknowledgement;
}


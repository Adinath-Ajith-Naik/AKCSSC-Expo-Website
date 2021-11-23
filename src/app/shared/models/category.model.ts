import { Acknowledgement } from "./acknowledgement.model";

export interface CreateCategoryRequest{
    category:string;
}
export interface Category{
    _id:string;
    category:string;  
    selected:boolean;
}

export interface GetCategoryResponse{
    acknowledgement:Acknowledgement;
    category:Category[];
}






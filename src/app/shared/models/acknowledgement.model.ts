export interface Acknowledgement{
    status:string;
    message:string;
}

export interface CommonResponse{
    acknowledgement:Acknowledgement
}
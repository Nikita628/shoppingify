export interface IError {
    message: string;
}

export interface IApiResponse {
    status: number;
    statusText: string;
    data: any;
}

export interface IdName {
    id: string | number;
    name: string;
}

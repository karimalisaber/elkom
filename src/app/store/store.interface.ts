export interface CustomResponse<T>{
    data: T;
    errors: [],
    messages: [],
    succeeded: boolean
}
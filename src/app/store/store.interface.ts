export interface CustomResponse<T> {
    data: T;
    errors: [],
    messages: [],
    succeeded: boolean
    pageInfo?: {
        totalCount: number,
        pageNumber: number,
        totalPages: number,
        pageSize: number
    }
}
export interface Status {
    loading: boolean
    loaded: boolean // to be set only once, after initial load
    error: boolean | string // false or error message
    creating: boolean // during POST
    updating: boolean // during PUT/PATCH
    deleting: boolean // during DELETE
}

export const initialStatus: Status = {
    loading: false,
    loaded: false,
    error: false,
    creating: false,
    updating: false,
    deleting: false
}

export const selectStatus = (state: any): Status => {
    const { loading, loaded, error, creating, updating, deleting } = state;
    return { loading, loaded, error, creating, updating, deleting }
};
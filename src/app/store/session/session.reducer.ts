import { createReducer, on } from '@ngrx/store';
import * as actions from './session.actions';
import { Session } from './session.model';
export const featureKey = 'session';

const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null
const token = localStorage.getItem('token')
const refreshToken = localStorage.getItem('refreshToken')
export interface State {
    session: Session
    loading: boolean
    loaded: boolean
    error: any
}

const initialState: State = {
    session: {
        user,
        authorityToken: null,
        token,
        refreshToken
    },
    loading: false,
    loaded: false,
    error: false
};

export const reducer = createReducer(
    initialState,
    on(actions.login, (state) => ({ ...state, loading: true })),
    on(actions.loginSuccess, (state, { data }) => {
        return { ...state, session: {...state.session, user: data.data}, loading: false, loaded: true }
    }),
    on(actions.getUserSuccess, (state, { data }) => {
        return { ...state, session: {...state.session, user: data.data}, loading: false, loaded: true }
    }),
    on(actions.studentSignupSuccess, (state, { session }) => {
        return { ...state, session, loading: false, loaded: true }
    }),
    on(actions.teacherSignupSuccess, (state, { session }) => {
        return { ...state, session, loading: false, loaded: true }
    }),

);

export const getSession = (state: State) => state.session;

import { createReducer, on } from '@ngrx/store';
import * as actions from './session.actions';
import { Session } from './session.model';
export const featureKey = 'session';

export interface State {
    session: Session
    loading: boolean
    loaded: boolean
    error: any
}

const initialState: State = {
    session: {
        user: null,
        authorityToken: null
    },
    loading: false,
    loaded: false,
    error: false
};

export const reducer = createReducer(
    initialState,
    on(actions.login, (state) => ({ ...state, loading: true })),
    on(actions.loginSuccess, (state, { session }) => {
        return { ...state, session: session, loading: false, loaded: true }
    }),
    on(actions.studentSignupSuccess, (state, { session }) => {
        return { ...state, session, loading: false, loaded: true }
    }),
    on(actions.teacherSignupSuccess, (state, { session }) => {
        return { ...state, session, loading: false, loaded: true }
    }),
);

export const getSession = (state: State) => state;

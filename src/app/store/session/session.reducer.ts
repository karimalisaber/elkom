import { createReducer, on } from '@ngrx/store';
import { Session } from './session.model';
import * as actions from './session.actions'
export const featureKey = 'session';

export interface State {
    session: Session
    loading: boolean
    loaded: boolean
    error: any
}

const initialState: State = {
    session: {
        isAuthenticated: false,
        user: []
    },
    loading: false,
    loaded: false,
    error: false
};

export const reducer = createReducer(
    initialState,
    on(actions.loadSession, (state) => ({ ...state, loading: true })),
    on(actions.loadSessionSuccess, (state, { session }) => {
        return { ...state, session, loading: false, loaded: true }
    }),
    on(actions.loadSessionFailure, (state, { error }) => ({ ...state, error, loading: false })),
    on(actions.deleteSession, (state) => ({ ...state, loading: true })),
    on(actions.deleteSessionSuccess, () => ({ ...initialState })),
    on(actions.deleteSessionFailure, (state, { error }) => ({ ...state, error, loading: false })),
);

export const getSession = (state: State) => state;

import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
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
    on(actions.studentSignupSuccess, (state, { user }) => {
        
        return { ...state, user: state, session:{...state.session, user}, loading: false, loaded: true }
    }),
    on(actions.logoutSuccess, (state, { }) => initialState),
    on(actions.teacherSignupSuccess, (state, {user}) => {
        return { ...state, session:{...state.session, user: null}, loading: false, loaded: true }
    }),


    on(actions.updatePersonalInformationSuccess, (state, { fullName, birthDate, gender }) => {
        return { ...state, user: state, session:{...state.session, user: {...user, fullName, birthDate, gender}}, loading: false, loaded: true }
    }),

    on(actions.updateEmailSuccess, (state, { email }) => {
        return { ...state, user: state, session:{...state.session, user: {...user, email}}, loading: false, loaded: true }
    }),

    on(actions.updateUserNameSuccess, (state, { userName }) => {
        return { ...state, user: state, session:{...state.session, user: {...user, userName}}, loading: false, loaded: true }
    }),

    on(actions.updateMobileSuccess, (state, { mobileNumber }) => {
        return { ...state, user: state, session:{...state.session, user: {...user, mobileNumber}}, loading: false, loaded: true }
    }),


);

export const selectSession = (state: State) => state.session;
const selector = createFeatureSelector(featureKey)
export const selectRole =  createSelector(selector, (state)=> state['session']?.user?.role)
export const selectUser =  createSelector(selector, (state)=> state['session']?.user)
export const selectIsLogIN =  createSelector(selector, (state)=> !!state['session']?.user?.username)
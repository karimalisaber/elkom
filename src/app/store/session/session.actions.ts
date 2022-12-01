import { CustomResponse } from './../store.interface';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Session, User } from './session.model';



export const login = createAction(
    '[Root/Session] login',
    props<{user: User}>()
);

export const loginSuccess = createAction(
    '[Root/Session] login Success',
    props<{ data: CustomResponse<User>}>()
);

export const loginFailure = createAction(
    '[Root/Session] login Failure',
    props<{ error: any }>()
);


export const getUser = createAction(
    '[Root/Session] getUser'
);

export const getUserSuccess = createAction(
    '[Root/Session] getUser Success',
    props<{ data: CustomResponse<User>}>()
);

export const getUserFailure = createAction(
    '[Root/Session] getUser Failure',
    props<{ error: any }>()
);



export const teacherSignup = createAction(
    '[Root/Session] teacher signup',
    props<{user: User}>()
);

export const teacherSignupSuccess = createAction(
    '[Root/Session] teacher signup Success',
    props<{ session: Session }>()
);

export const teacherSignupFailure = createAction(
    '[Root/Session] teacher signup Failure',
    props<{ error: any }>()
);



export const studentSignup = createAction(
    '[Root/Session] student signup',
    props<{user: User}>()
);

export const studentSignupSuccess = createAction(
    '[Root/Session] student signup Success',
    props<{ session: Session }>()
);

export const studentSignupFailure = createAction(
    '[Root/Session] teacher signup Failure',
    props<{ error: any }>()
);


export const SessionExpired = createAction(
    '[Root/Session] Session Expired'
)

export const deleteSession = createAction(
    '[Root/Session] Delete Session',
    props<{ expired?: boolean }>()
);

export const deleteSessionSuccess = createAction(
    '[Root/Session] Delete Session Success',
    props<{ force: boolean }>()
);


export const deleteSessionFailure = createAction(
    '[Root/Session] Delete Session Failure',
    props<{ error: any }>()
);

export const updateSession = createAction(
    '[Root/Session] Update Session',
    props<{ session: Update<Session> }>()
);

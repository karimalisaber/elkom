import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { Session, User } from './session.model';



export const login = createAction(
    '[Root/Session] login',
    props<{user: User}>()
);

export const loginSuccess = createAction(
    '[Root/Session] login Success',
    props<{ session: Session }>()
);

export const loginFailure = createAction(
    '[Root/Session] login Failure',
    props<{ error: any }>()
);








export const loadSession = createAction(
    '[Root/Session] Load Session'
);

export const loadSessionSuccess = createAction(
    '[Root/Session] Load Session Success',
    props<{ session: Session }>()
);

export const loadSessionFailure = createAction(
    '[Root/Session] Load Session Failure',
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

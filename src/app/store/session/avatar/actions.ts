import { createAction, props } from "@ngrx/store";
import { CustomResponse } from "../../store.interface";

export const updateAvatar = createAction(
    '[Root/Session] updateAvatar',
    props<{ file: FormData }>()
);

export const updateAvatarSuccess = createAction(
    '[Root/Session] updateAvatar Success',
    props<{ response: CustomResponse<string> }>()
);

export const updateAvatarFailure = createAction(
    '[Root/Session] updateAvatar Failure',
    props<{ error: any }>()
);


export const loadAvatar = createAction(
    '[Root/Session] loadAvatar',
    props<{ url: string }>()

);

export const loadAvatarSuccess = createAction(
    '[Root/Session] loadAvatar Success',
    props<{ response: any }>()
);

export const loadAvatarFailure = createAction(
    '[Root/Session] loadAvatar Failure',
    props<{ error: any }>()
);
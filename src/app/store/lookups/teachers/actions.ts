import { createAction, props } from '@ngrx/store';
import { Teacher } from './model';
import {CustomResponse} from 'src/app/store/store.interface'

export const loadTeachers = createAction(
    '[Root/Lookups] loadTeachers'
);

export const loadTeachersSuccess = createAction(
    '[Root/Lookups] loadTeachers Success',
    props<{ response: CustomResponse<Teacher[]> }>()
);

export const loadTeachersFailure = createAction(
    '[Root/Lookups] loadTeachers Failure',
    props<{ error: any }>()
);



export const loadTeacher = createAction(
    '[Root/Lookups] loadTeacher',
    props<{ id: string }>()

);

export const loadTeacherSuccess = createAction(
    '[Root/Lookups] loadTeacher Success',
    props<{ response: CustomResponse<Teacher> }>()
);

export const loadTeacherFailure = createAction(
    '[Root/Lookups] loadTeacher Failure',
    props<{ error: any }>()
);
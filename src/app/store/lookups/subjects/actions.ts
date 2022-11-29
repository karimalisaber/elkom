import { createAction, props } from '@ngrx/store';
import { Subject } from './model';
import {CustomResponse} from 'src/app/store/store.interface'

export const loadSubjects = createAction(
    '[Root/Lookups] loadSubjects'
);

export const loadSubjectsSuccess = createAction(
    '[Root/Lookups] loadSubjects Success',
    props<{ response: CustomResponse<Subject[]> }>()
);

export const loadSubjectsFailure = createAction(
    '[Root/Lookups] loadSubjects Failure',
    props<{ error: any }>()
);





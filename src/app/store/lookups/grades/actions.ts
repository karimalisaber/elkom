import { createAction, props } from '@ngrx/store';
import { Grade } from './model';
import {CustomResponse} from 'src/app/store/store.interface'

export const loadGrades = createAction(
    '[Root/Lookups] loadGrades'
);

export const loadGradesSuccess = createAction(
    '[Root/Lookups] loadGrades Success',
    props<{ response: CustomResponse<Grade[]> }>()
);

export const loadGradesFailure = createAction(
    '[Root/Lookups] loadGrades Failure',
    props<{ error: any }>()
);





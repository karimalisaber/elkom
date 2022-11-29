import { createAction, props } from '@ngrx/store';
import { CustomResponse } from '../../store.interface';
import { Lecture } from './model';

export const loadLectures = createAction(
    '[Root/Lookups] loadLectures'
);

export const loadLecturesSuccess = createAction(
    '[Root/Lookups] loadLectures Success',
    props<{ response: CustomResponse<Lecture[]> }>()
);

export const loadLecturesFailure = createAction(
    '[Root/Lookups] loadLectures Failure',
    props<{ error: any }>()
);





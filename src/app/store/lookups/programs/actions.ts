import { createAction, props } from '@ngrx/store';
import { Program } from './model';
import {CustomResponse} from 'src/app/store/store.interface'

export const loadPrograms = createAction(
    '[Root/Lookups] loadPrograms'
);

export const loadProgramsSuccess = createAction(
    '[Root/Lookups] loadPrograms Success',
    props<{ response: CustomResponse<Program[]> }>()
);

export const loadProgramsFailure = createAction(
    '[Root/Lookups] loadPrograms Failure',
    props<{ error: any }>()
);





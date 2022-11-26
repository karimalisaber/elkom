import { createAction, props } from '@ngrx/store';
import { Specialty } from './model';
import {CustomResponse} from 'src/app/store/store.interface'

export const loadSpecialties = createAction(
    '[Root/Lookups] loadSpecialties'
);

export const loadSpecialtiesSuccess = createAction(
    '[Root/Lookups] loadSpecialties Success',
    props<{ response: CustomResponse<Specialty[]> }>()
);

export const loadSpecialtiesFailure = createAction(
    '[Root/Lookups] loadSpecialties Failure',
    props<{ error: any }>()
);





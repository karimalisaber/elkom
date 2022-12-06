import { createAction, props } from '@ngrx/store';
import { Question } from './model';
import {CustomResponse} from 'src/app/store/store.interface'

export const loadMyQuestions = createAction(
    '[Root/Lookups] loadMyQuestions'
);

export const loadMyQuestionsSuccess = createAction(
    '[Root/Lookups] loadMyQuestions Success',
    props<{ response: CustomResponse<Question[]> }>()
);

export const loadMyQuestionsFailure = createAction(
    '[Root/Lookups] loadMyQuestions Failure',
    props<{ error: any }>()
);

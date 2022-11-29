import { createAction, props } from '@ngrx/store';
import { Question } from './model';
import {CustomResponse} from 'src/app/store/store.interface'

export const loadQuestions = createAction(
    '[Root/Lookups] loadQuestions'
);

export const loadQuestionsSuccess = createAction(
    '[Root/Lookups] loadQuestions Success',
    props<{ response: CustomResponse<Question[]> }>()
);

export const loadQuestionsFailure = createAction(
    '[Root/Lookups] loadQuestions Failure',
    props<{ error: any }>()
);





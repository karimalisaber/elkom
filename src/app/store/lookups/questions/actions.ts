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



export const loadQuestion = createAction(
    '[Root/Lookups] loadQuestion',
    props<{ id: string }>()

);

export const loadQuestionSuccess = createAction(
    '[Root/Lookups] loadQuestion Success',
    props<{ response: CustomResponse<Question> }>()
);

export const loadQuestionFailure = createAction(
    '[Root/Lookups] loadQuestion Failure',
    props<{ error: any }>()
);




export const askQuestion = createAction(
    '[Root/Lookups] askQuestion',
    props<{ payload: Partial<Question>, files: File[] }>()

);

export const askQuestionSuccess = createAction(
    'askQuestion Success',
    props<{ response: CustomResponse<Question[]> }>()
);

export const askQuestionFailure = createAction(
    '[Root/Lookups] askQuestions Failure',
    props<{ error: any }>()
);

export const answerQuestion = createAction(
    '[Root/Lookups] answerQuestion',
    props<{ questionId: string, text: string }>()

);

export const answerQuestionSuccess = createAction(
    'answerQuestion Success',
    props<{ response: CustomResponse<Question[]> }>()
);

export const answerQuestionFailure = createAction(
    '[Root/Lookups] askQuestions Failure',
    props<{ error: any }>()
);





export const editQuestion = createAction(
    '[Root/Lookups] editQuestion',
    props<{ payload: Partial<Question> }>()

);

export const editQuestionSuccess = createAction(
    'editQuestion Success',
    props<{ response: CustomResponse<Question[]> }>()
);

export const editQuestionFailure = createAction(
    '[Root/Lookups] editQuestions Failure',
    props<{ error: any }>()
);


export const voteQuestion = createAction(
    '[Root/Lookups] vote',
    props<{ voteType: 1 | 2, id: string }>()
);

export const voteQuestionSuccess = createAction(
    'vote Success',
    props<{ voteType: 1 | 2, id: string }>()
);

export const voteQuestionFailure = createAction(
    '[Root/Lookups] votes Failure',
    props<{ error: any }>()
);
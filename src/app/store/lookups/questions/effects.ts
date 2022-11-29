import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, distinct, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../../store.interface';
import * as actions from './actions'
import { Question } from './model';

const BaseUrl = environment.baserUrl

@Injectable()
export class QuestionsEffect {
    
    load$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.loadQuestions),
            // take(1),
            mergeMap(({ }) => this.load()
                .pipe(
                    map((response: any) => actions.loadQuestionsSuccess({ response })),
                    catchError((error) => of(actions.loadQuestionsFailure({ error })))
                ),
            )
        )
    );

    load(): Observable<CustomResponse<Question[]>>{
        const url = BaseUrl + '/questions/list'
        return this.http.get<CustomResponse<Question[]>>(url)
    }
    
    constructor(
        private http: HttpClient,
        private actions$: Actions
    ) { }
}

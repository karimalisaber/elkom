import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, distinct, Observable, take, switchMap, combineLatest } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../../store.interface';
import * as actions from './actions'
import { Question } from './model';

const BaseUrl = environment.baserUrl

@Injectable()
export class MyQuestionsEffect {

    loadAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.loadMyQuestions),
            // take(1),
            mergeMap(({ }) => this.loadAll()
                .pipe(
                    map((response: any) => actions.loadMyQuestionsSuccess({ response })),
                    catchError((error) => of(actions.loadMyQuestionsFailure({ error })))
                ),
            )
        )
    );

    loadAll(): Observable<CustomResponse<Question[]>> {
        const url = BaseUrl + '/questions/list/answeredBy'
        return this.http.get<CustomResponse<Question[]>>(url)
    }








    constructor(
        private http: HttpClient,
        private actions$: Actions
    ) { }
}

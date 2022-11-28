import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, distinct, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../../store.interface';
import * as actions from './actions'
import { Grade } from './model';

const BaseUrl = environment.baserUrl

@Injectable()
export class GradesEffect {
    
    load$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.loadGrades),
            // take(1),
            mergeMap(({ }) => this.load()
                .pipe(
                    map((response: any) => actions.loadGradesSuccess({ response })),
                    catchError((error) => of(actions.loadGradesFailure({ error })))
                ),
            )
        )
    );

    load(): Observable<CustomResponse<Grade[]>>{
        const url = BaseUrl + '/lookups/grades/list'
        return this.http.get<CustomResponse<Grade[]>>(url)
    }
    
    constructor(
        private http: HttpClient,
        private actions$: Actions
    ) { }
}

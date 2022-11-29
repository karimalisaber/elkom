import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';
import { CustomResponse } from '../../store.interface';
import { environment } from './../../../../environments/environment';
import * as actions from './actions';
import { Lecture } from './model';

const BaseUrl = environment.baserUrl

@Injectable()
export class LecturesEffect {
    
    load$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.loadLectures),
            // take(1),
            mergeMap(({ }) => this.load()
                .pipe(
                    map((response: any) => actions.loadLecturesSuccess({ response })),
                    catchError((error) => of(actions.loadLecturesFailure({ error })))
                ),
            )
        )
    );

    load(): Observable<CustomResponse<Lecture[]>>{
        const url = BaseUrl + '/lookups/lectures/list'
        return this.http.get<CustomResponse<Lecture[]>>(url)
    }
    
    constructor(
        private http: HttpClient,
        private actions$: Actions
    ) { }
}

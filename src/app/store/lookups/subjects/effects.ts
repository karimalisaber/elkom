import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, distinct, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../../store.interface';
import * as actions from './actions'
import { Subject } from './model';

const BaseUrl = environment.baserUrl

@Injectable()
export class SubjectsEffect {
    
    load$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.loadSubjects),
            // take(1),
            mergeMap(({ }) => this.load()
                .pipe(
                    map((response: any) => actions.loadSubjectsSuccess({ response })),
                    catchError((error) => of(actions.loadSubjectsFailure({ error })))
                ),
            )
        )
    );

    load(): Observable<CustomResponse<Subject[]>>{
        const url = BaseUrl + '/lookups/subjects/list'
        return this.http.get<CustomResponse<Subject[]>>(url)
    }
    
    constructor(
        private http: HttpClient,
        private actions$: Actions
    ) { }
}

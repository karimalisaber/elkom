import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, distinct, Observable, take, switchMap, combineLatest } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../../store.interface';
import * as actions from './actions'
import { Teacher } from './model';

const BaseUrl = environment.baserUrl

@Injectable()
export class TeachersEffect {

    loadAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.loadTeachers),
            // take(1),
            mergeMap(({ }) => this.loadAll()
                .pipe(
                    map((response: any) => actions.loadTeachersSuccess({ response })),
                    catchError((error) => of(actions.loadTeachersFailure({ error })))
                ),
            )
        )
    );

    loadAll(): Observable<CustomResponse<Teacher[]>> {
        const url = BaseUrl + '/users/teachers/list'
        return this.http.get<CustomResponse<Teacher[]>>(url)
    }



    loadOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.loadTeacher),
            // take(1),
            mergeMap(({ id}) => this.loadOne(id)
                .pipe(
                    map((response: any) => actions.loadTeacherSuccess({ response })),
                    catchError((error) => of(actions.loadTeacherFailure({ error })))
                ),
            )
        )
    );

    
    loadOne(id): Observable<CustomResponse<Teacher>> {
        const url = BaseUrl + `/users/teachers/get?id=${id}`
        return this.http.get<CustomResponse<Teacher>>(url)
    }


    constructor(
        private http: HttpClient,
        private actions$: Actions
    ) { }
}

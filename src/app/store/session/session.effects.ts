import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import * as actions from './session.actions';

const url = environment.baserUrl

@Injectable()
export class SessionEffects {

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.login),
            mergeMap(({ user }) => this.login(user)
                .pipe(
                    map(
                        session => actions.loginSuccess({ session })),
                    catchError((error) => of(actions.loginFailure({ error })))
                ),
            )
        )
    );

    login(user: any): Observable<any> {
        return this.http.post(url, user)
    }

    constructor(
        private http: HttpClient,
        private actions$: Actions
    ) { }
}

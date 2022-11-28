import { User } from './session.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import * as actions from './session.actions';

const BaseUrl = environment.baserUrl

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


    teacherSignup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.teacherSignup),
            mergeMap(({ user }) => this.addTeacher(user)
                .pipe(
                    map(
                        (res: any) => actions.teacherSignupSuccess({ user: res })),
                    catchError((error) => of(actions.teacherSignupFailure({ error })))
                ),
            )
        )
    );


    studentSignup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.studentSignup),
            mergeMap(({ user }) => this.addStudent(user)
                .pipe(
                    map(
                        (res: any) => actions.studentSignupSuccess({ user: res })),
                    catchError((error) => of(actions.studentSignupFailure({ error })))
                ),
            )
        )
    );

    addTeacher(user: User) {
        const url = BaseUrl + '/users/teachers/add'

        return this.http.post(url, user)
    }

    
   

    addStudent(user: User) {
        const url = BaseUrl + '/users/students/add'

        return this.http.post(url, user)
    }

    login(user: any): Observable<any> {
        const url = BaseUrl + '/authentications/SignIn'
        return this.http.post(url, user)
    }

    constructor(
        private http: HttpClient,
        private actions$: Actions
    ) { }
}

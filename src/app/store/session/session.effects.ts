import { AuthService } from './../../services/auth.service';
import { CustomResponse } from './../store.interface';
import { User, Session } from './session.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of, switchMap, tap } from 'rxjs';
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
                        data => actions.loginSuccess({ data })),
                    catchError((error) => of(actions.loginFailure({ error })))
                ),
            )
        )
    );


    getUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.getUser),
            mergeMap(() => this.getUser()
                .pipe(
                    map(
                        data => actions.getUserSuccess({ data })),
                    catchError((error) => of(actions.getUserFailure({ error })))
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
                        (res: any) => actions.teacherSignupSuccess({ session: res })),
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
                        (res: any) => actions.studentSignupSuccess({ session: res })),
                    catchError((error) => of(actions.studentSignupFailure({ error })))
                ),
            )
        )
    );

    addTeacher(user: User) {
        const url = BaseUrl + '/users/teachers/add'

        return this.http.post(url, user).pipe(
            switchMap((res: any) => {
                if (res.succeeded) {
                    return this.login(user)
                } else {
                    throw (res)
                }
            })
        )
    }

    addStudent(user: User) {
        const url = BaseUrl + '/users/students/add'

        return this.http.post(url, user)
    }

    login(user: any): Observable<CustomResponse<User>> {
        const url = BaseUrl + '/authentications/SignIn'
        return this.http.post<CustomResponse<Session>>(url, user).pipe(
            tap(res => {
                this.auth.setToken(res.data.token)
                this.auth.setRefreshToken(res.data.refreshToken)
            }),
            switchMap((res: any) => {
                if (res.succeeded) {

                    return this.getUser()
                } else {
                    throw (res)
                }
            })
        )
    }

    private getUser(): Observable<CustomResponse<User>> {
        const url = BaseUrl + '/users/get'
        return this.http.get<CustomResponse<User>>(url).pipe(tap(res => this.auth.setUser(res.data)))
    }
    constructor(
        private http: HttpClient,
        private actions$: Actions,
        private auth: AuthService

    ) { }
}

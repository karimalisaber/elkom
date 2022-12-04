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
                        (res: any) => actions.teacherSignupSuccess({ user: res.data })),
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
                        (res: any) => actions.studentSignupSuccess({ user: res.data })),
                    catchError((error) => of(actions.studentSignupFailure({ error })))
                ),
            )
        )
    );


    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.logout),
            tap(() => this.logout())
        )
    );

    logout() {
        this.auth.logOut()
    
        return of()
    }

    addTeacher(user: User) {
        const url = BaseUrl + '/users/signup/teacher'

        return this.http.post(url, user).pipe(
            switchMap((res: any) => {
                // debugger
                if (res.succeeded) {
                    this.auth.setToken(res.data.authorityToken)

                    return this.login(user)
                } else {
                    throw (res)
                }
            })
        )
    }

    addStudent(user: User) {
        const url = BaseUrl + '/users/signup/student'

        return this.http.post(url, user).pipe(
            switchMap((res: any) => {
                if (res.succeeded) {
                    this.auth.setToken(res.data.authorityToken)

                    return this.login(user)
                } else {
                    throw (res)
                }
            })
        )
    }

    login(user: any): Observable<CustomResponse<User>> {
        const url = BaseUrl + '/authentications/SignIn'
        return this.http.post<CustomResponse<Session>>(url, user).pipe(
        
            switchMap((res: any) => {
                if (res.succeeded) {
                    this.auth.setToken(res.data.token)
                    this.auth.setRefreshToken(res.data.refreshToken)
                    
                    return this.getUser()
                } else {
                    throw (res)
                }
            })
        )
    }

    private getUser(): Observable<CustomResponse<User>> {
        const url = BaseUrl + '/users/profile/get'
        return this.http.get<CustomResponse<User>>(url).pipe(tap(res => this.auth.setUser(res.data)))
    }



    updateEmail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.updateEmail),
            mergeMap((body) => this.updateEmail(body)
                .pipe(
                    map(
                        (res: any) => actions.updateEmailSuccess({ email: body.identity })),
                    catchError((error) => of(actions.updateEmailFailure({ error })))
                ),
            )
        )
    );

    updateEmail(body: {identity: string}){
        const url = BaseUrl + '/users/update/email'

        return this.http.put(url, body)
    }

    updateMobile$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.updateMobile),
            mergeMap((body ) => this.updateMobile(body)
                .pipe(
                    map(
                        (res: any) => actions.updateMobileSuccess({ mobileNumber: body.identity })),
                    catchError((error) => of(actions.updateMobileFailure({ error })))
                ),
            )
        )
    );

    updateMobile(body: {identity: string}){
        const url = BaseUrl + '/users/update/mobile'

        return this.http.put(url, body)
    }

    
    updateUserName$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.updateUserName),
            mergeMap((body) => this.updateUserName(body)
                .pipe(
                    map(
                        (res: any) => actions.updateUserNameSuccess({ userName: body.identity })),
                    catchError((error) => of(actions.updateUserNameFailure({ error })))
                ),
            )
        )
    );



    updateUserName(body: {identity: string}){
        const url = BaseUrl + '/users/update/username'

        return this.http.put(url, body)
    }




    constructor(
        private http: HttpClient,
        private actions$: Actions,
        private auth: AuthService
    ) { }
}

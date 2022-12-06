import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../../store.interface';
import * as actions from './actions';
const BaseUrl = environment.baserUrl

@Injectable()
export class UserAvatarEffect {

    loadAvatar$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.loadAvatar),
            // take(1),
            mergeMap(({ }) => this.loadAvatar()
                .pipe(
                    map((response: any) => actions.loadAvatarSuccess({ response })),
                    catchError((error) => of(actions.loadAvatarFailure({ error })))
                ),
            )
        )
    );

    loadAvatar(): Observable<CustomResponse<any>> {
        const url = BaseUrl + '/users/profile/avatar'
        return this.http.get<CustomResponse<any>>(url)
    }


    
    updateAvatar$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.updateAvatar),
            // take(1),
            mergeMap(({file }) => this.updateAvatar(file)
                .pipe(
                    map((response: any) => actions.updateAvatarSuccess({ response })),
                    catchError((error) => of(actions.updateAvatarFailure({ error })))
                ),
            )
        )
    );

    updateAvatar(file): Observable<CustomResponse<any>> {
        const url = BaseUrl + '/users/profile/update/avatar'
        return this.http.put<CustomResponse<any>>(url, file)
    }

    constructor(
        private http: HttpClient,
        private actions$: Actions
    ) { }
}

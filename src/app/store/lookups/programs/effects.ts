import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../../store.interface';
import * as actions from './actions';
import { Program } from './model';

const BaseUrl = environment.baserUrl

@Injectable()
export class ProgramsEffect {
    
    load$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.loadPrograms),
            // take(1),
            mergeMap(({ }) => this.load()
                .pipe(
                    map((response: any) => actions.loadProgramsSuccess({ response })),
                    catchError((error) => of(actions.loadProgramsFailure({ error })))
                ),
            )
        )
    );

    load(): Observable<CustomResponse<Program[]>>{
        const url = BaseUrl + '/lookups/programs/list'
        return this.http.get<CustomResponse<Program[]>>(url)
    }
    
    constructor(
        private http: HttpClient,
        private actions$: Actions
    ) { }
}

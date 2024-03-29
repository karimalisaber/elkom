import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, distinct, Observable, take, switchMap, combineLatest } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../../store.interface';
import * as actions from './actions'
import { Question } from './model';

const BaseUrl = environment.baserUrl

@Injectable()
export class QuestionsEffect {

    loadAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.loadQuestions),
            // take(1),
            mergeMap(({ }) => this.loadAll()
                .pipe(
                    map((response: any) => actions.loadQuestionsSuccess({ response })),
                    catchError((error) => of(actions.loadQuestionsFailure({ error })))
                ),
            )
        )
    );

    loadAll(): Observable<CustomResponse<Question[]>> {
        const url = BaseUrl + '/questions/list'
        return this.http.get<CustomResponse<Question[]>>(url)
    }



    loadOne$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.loadQuestion),
            // take(1),
            mergeMap(({ id }) => this.loadOne(id)
                .pipe(
                    map((response: any) => actions.loadQuestionSuccess({ response })),
                    catchError((error) => of(actions.loadQuestionFailure({ error })))
                ),
            )
        )
    );


    loadOne(id): Observable<CustomResponse<Question>> {
        const url = BaseUrl + `/questions/get?id=${id}`
        return this.http.get<CustomResponse<Question>>(url)
    }



    ask$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.askQuestion),
            // take(1),
            mergeMap(({ payload, files }) => this.ask(payload, files)
                .pipe(
                    map((response: any) => actions.askQuestionSuccess({ response })),
                    catchError((error) => of(actions.askQuestionFailure({ error })))
                ),
            )
        )
    );


    editQuestion$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.editQuestion),
            // take(1),
            mergeMap(({ payload }) => this.editQuestion(payload)
                .pipe(
                    map((response: any) => actions.editQuestionSuccess({ response })),
                    catchError((error) => of(actions.editQuestionFailure({ error })))
                ),
            )
        )
    );

    editQuestion(payload) {
        const url = BaseUrl + '/questions/update'

        let requestBody = {
            text: payload.text || undefined,
            tags: payload.tags || undefined,
            description: payload.description ? payload.description.replace(/\n/g, '<br>') : undefined
        }

        return this.http.post(url, requestBody).pipe(map((response: any) => response?.data ?? null))
    }



    vote$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.voteQuestion),
            // take(1),
            mergeMap(({ voteType }) => this.vote(voteType)
                .pipe(
                    map((response: any) => actions.voteQuestionSuccess({ voteType ,id:'' })),
                    catchError((error) => of(actions.voteQuestionFailure({ error })))
                ),
            )
        )
    );

    vote(voteType) {
        const url = BaseUrl + '/questions/update'


        return this.http.post(url, voteType).pipe(map((response: any) => response?.data ?? null))
    }



    answer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.answerQuestion),
            // take(1),
            mergeMap(({ questionId, text }) => this.answer(questionId, text)
                .pipe(
                    map((response: any) => actions.answerQuestionSuccess({ response })),
                    catchError((error) => of(actions.answerQuestionFailure({ error })))
                ),
            )
        )
    );

    answer(questionId: string, text: string) {
        const url = BaseUrl + '/questions/answers/add'
        return this.http.post(url, { questionId, text })
    }


    uploadQuestionFiles(id: string, file: File) {
        const url = BaseUrl + `/questions/attachments/upload?id=${id}`

        let body = new FormData();
        body.append('files', file)
        return this.http.post(url, body)
    }


    ask(payload: Partial<Question>, files: File[]) {
        const url = BaseUrl + '/questions/add'

        if (!payload.hasAttachments) {
            let requestBody = {
                hasAttachments: false,
                text: payload.text || undefined,
                tags: payload.tags || undefined,
                description: payload.description ? payload.description.replace(/\n/g, '<br>') : undefined
            }

            return this.http.post(url, requestBody).pipe(map((response: any) => response?.data ?? null))
        } else {
            let requestBody = {
                hasAttachments: true,
                text: payload.text || undefined,
                tags: payload.tags || undefined,
                description: payload.description ? payload.description.replace(/\n/g, '<br>') : undefined
            }

            let request = this.http.post(url, requestBody).pipe(map((response: any) => response?.data ?? null))
            return request.pipe(switchMap(id => combineLatest([...files.map(file => this.uploadQuestionFiles(id, file))])))
        }
    }


    constructor(
        private http: HttpClient,
        private actions$: Actions
    ) { }
}

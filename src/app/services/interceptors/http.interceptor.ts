import { select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable, switchMap, take, map } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor as NgHttpInterceptor
} from '@angular/common/http';
import { selectSession } from 'src/app/store/root.store';


@Injectable()
export class HttpInterceptor implements NgHttpInterceptor {

  constructor(
    private store: Store<any>
  ) { }

  requestFactory(request: HttpRequest<unknown>, accessToken?: any): HttpRequest<unknown> {
    // const lang = this.localizationService.getLanguage()
    
    const headers: any = { 'X-language': 'en' }
    if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`

    return request.clone({ setHeaders: headers })
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.pipe(select(selectSession), take(1), switchMap((session: any) => next.handle(this.requestFactory(request, session?.token))))
  }
}

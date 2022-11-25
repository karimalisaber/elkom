import { loginFailure } from './../store/session/session.actions';
import { Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { loginSuccess } from '../store/session/session.actions';

const SuccessSubjects$ =[
  loginSuccess
]


const ErrorSubjects$ =[
  loginFailure
]

@Injectable({
  providedIn: 'root'
})

export class ToastrService {
  constructor(
    private notification : NzNotificationService,
    private action$: Actions
  ){
   
  }

  init(){
    SuccessSubjects$.forEach(observable=>{
      this.action$.pipe(ofType(observable))
        .subscribe(res=>{
          this.notification.success('done' ,'content')
        })
    })
  

    ErrorSubjects$.forEach(observable=>{
      this.action$.pipe(ofType(observable))
        .subscribe(res=>{
          this.notification.error('done' ,'content')
        })
    })
  
  }


}

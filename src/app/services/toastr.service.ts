import { TranslateService } from '@ngx-translate/core';
import { loginFailure, teacherSignupSuccess, studentSignupSuccess, teacherSignupFailure, studentSignupFailure } from './../store/session/session.actions';
import { Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { loginSuccess } from '../store/session/session.actions';

const SuccessSubjects$ =[
  loginSuccess,
  teacherSignupSuccess,
  studentSignupSuccess
]


const ErrorSubjects$ =[
  loginFailure,
  teacherSignupFailure,
  studentSignupFailure
]

@Injectable({
  providedIn: 'root'
})

export class ToastrService {
  constructor(
    private notification : NzNotificationService,
    private action$: Actions,
    private translate: TranslateService
  ){
   
  }

  init(){
    SuccessSubjects$.forEach(observable=>{
      this.action$.pipe(ofType(observable))
        .subscribe(res=>{
          console.log(res,'toastr')
          this.notification.success(res.type ,'')
        })
    })
  

    ErrorSubjects$.forEach(observable=>{
      this.action$.pipe(ofType(observable))
        .subscribe(res=>{
          this.notification.error(res.type , '')
        })
    })
  
  }


  success(title: string, desc: string = ''){
    const _title = this.translate.instant(title)
    
    let _desc
    if(_desc)
     _desc = this.translate.instant(desc)

    this.notification.success(_title ,_desc)

  }

  error(title: string, desc: string = ''){
    const _title = this.translate.instant(title)
    let _desc
    if(_desc)
     _desc = this.translate.instant(desc)

    this.notification.error(_title ,_desc)
  }

}

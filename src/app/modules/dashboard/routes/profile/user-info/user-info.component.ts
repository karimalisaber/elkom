import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from './../../../../../services/toastr.service';
import { take } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { updateMobile, updatePersonalInformation, updateUserName, updateEmailSuccess, updateUserNameSuccess, updateMobileSuccess, updatePersonalInformationSuccess } from './../../../../../store/session/session.actions';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/store/session/session.model';
import { updateEmail } from 'src/app/store/session/session.actions';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  @Input() user: User
  form: FormGroup;
  isUpdatingEmail: boolean;
  isUpdatingUserName: boolean;
  isUpdatingMobile: boolean;
  isUpdatingUserInfo: boolean;

  constructor(
    private fb: FormBuilder, 
    private store: Store<any>, 
    private actions: Actions,
    private toastr: ToastrService,
    private translate: TranslateService
    ) { }

  ngOnInit(): void {
    this.initForm()

  }



  initForm() {
    this.form = this.fb.group({
      email: [this.user?.email],
      username: [this.user?.username],
      fullName: [this.user?.fullName, Validators.required],
      gender: [this.user?.gender, Validators.required],
      birthDate: [new Date(this.user?.birthDate).toDateString(), Validators.required],
      mobileNumber: [this.user?.mobileNumber?.number]
    })
  }


  updateEmail() {
    const email = this.form.value.email
    this.store.dispatch(updateEmail({ identity: email }))
    this.isUpdatingEmail = true;

    this.actions.pipe(ofType(updateEmailSuccess), take(1)).subscribe(res=>{
      this.isUpdatingEmail = false;
      this.toastr.success('emailUpdated')
    })
  }

  updateUserName() {
    const username = this.form.value.username
    this.store.dispatch(updateUserName({ identity: username }))
    this.isUpdatingUserName = true;

    this.actions.pipe(ofType(updateUserNameSuccess), take(1)).subscribe(res=>{
      this.isUpdatingUserName = false;
      this.toastr.success('userNameUpdated')
    })
  }

  updateMobile() {
    const mobileNumber = this.form.value.mobileNumber
    this.store.dispatch(updateMobile({ identity: mobileNumber }))
    this.isUpdatingMobile = true;
    this.actions.pipe(ofType(updateMobileSuccess), take(1)).subscribe(res=>{
      this.isUpdatingMobile = false;
      this.toastr.success('mobileUpdated')
    })
    
  }




  updatePersonalInfo() {
    this.store.dispatch(updatePersonalInformation({
      fullName: this.form.get('fullName').value,
      birthDate: new Date(this.form.get('birthDate').value),
      gender: this.form.get('gender').value
    }))

    this.isUpdatingUserInfo = true

    this.actions.pipe(ofType(updatePersonalInformationSuccess), take(1)).subscribe(res=>{
      this.isUpdatingUserInfo = false;
      this.toastr.success('userInfoUpdated')

    })
  }
}

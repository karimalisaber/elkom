import { updateMobile, updatePersonalInformation, updateUserName } from './../../../../../store/session/session.actions';
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

  constructor(private fb: FormBuilder, private store: Store<any>) { }

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
  }

  updateUserName() {
    const username = this.form.value.username
    this.store.dispatch(updateUserName({ identity: username }))
  }

  updateMobile() {
    const mobileNumber = this.form.value.mobileNumber
    this.store.dispatch(updateMobile({ identity: mobileNumber }))

  }




  updatePersonalInfo() {
    this.store.dispatch(updatePersonalInformation({
      fullName: this.form.get('fullName').value,
      birthDate: new Date(this.form.get('birthDate').value),
      gender: this.form.get('gender').value
    }))
  }
}

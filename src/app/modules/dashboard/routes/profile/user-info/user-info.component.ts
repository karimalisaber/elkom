import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/store/session/session.model';
import { updateEmail } from 'src/app/store/session/session.actions';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  @Input() user : User
  form : FormGroup;

  constructor(private fb: FormBuilder, private store: Store<any>) { }

  ngOnInit(): void {
    this.initForm()

  }


  
  initForm() {
    this.form = this.fb.group({
      email: [this.user?.email],
      username: [this.user?.username],
      fullName: [this.user?.fullName],
      gender: [this.user?.gender],
      birthDate: [new Date(this.user?.birthDate).toDateString()],
      mobileNumber: [this.user?.mobileNumber?.number]
    })
  }


  updateEmail(){
    const email = this.form.value.email 
    this.store.dispatch(updateEmail({identity: email }))
  }

  updateUserName(){

    const email = this.form.value.userName 
    this.store.dispatch(updateEmail({identity: email }))
  }

  updateMobile(){
    const mobileNumber = this.form.value.mobileNumber 
    this.store.dispatch(updateEmail({identity: mobileNumber }))
    
  }


  updateBirthDate(){
    
  }
}

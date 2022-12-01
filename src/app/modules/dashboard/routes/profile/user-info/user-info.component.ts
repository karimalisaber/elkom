import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/store/session/session.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  @Input() user : User
  form : FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm()

  }


  
  initForm() {
    this.form = this.fb.group({
      email: [this.user?.email],
      fullName: [this.user?.fullName],
      birthDate: [new Date(this.user?.birthDate).toDateString()],
      mobileNumber: [this.user?.mobileNumber?.number]
    })
  }
}

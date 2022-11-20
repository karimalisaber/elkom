import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  form = this.fb.group({
    email: [],
    fullName: [],
    dateOfBirth: [],
    mobileNumber: []
  })
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}

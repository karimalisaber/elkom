import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserRoleEnum } from 'src/app/models/user';

@Component({
  selector: 'auth-student-signup',
  templateUrl: './student-signup.component.html',
  styleUrls: ['./student-signup.component.scss']
})
export class StudentSignupComponent implements OnInit {
  form = this.fb.group({
    fullName: ['', [Validators.required]],
    class: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    mobileNumber: ['', [Validators.required, Validators.pattern(/^[+()\d-]+$/)]],
    birthDate: [null, [Validators.required]],
    gender: [null, Validators.required],
    role: UserRoleEnum.Student,
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    confirmationBaseUrl: []
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  signup() {

  }

}

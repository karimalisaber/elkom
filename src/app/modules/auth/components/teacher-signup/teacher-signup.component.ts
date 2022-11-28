import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'auth-teacher-signup',
  templateUrl: './teacher-signup.component.html',
  styleUrls: ['./teacher-signup.component.scss']
})
export class TeacherSignupComponent implements OnInit {
  form = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    mobileNumber: ['', [Validators.required, Validators.pattern(/^[+()\d-]+$/)]],
    birthDate: [null, [Validators.required]],
    gender: [null, Validators.required],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    confirmationBaseUrl: []
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  signup(){
    
  }
}

import { Router } from '@angular/router';
import { teacherSignup, teacherSignupSuccess } from './../../../../store/session/session.actions';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/store/session/session.model';
import { take } from 'rxjs';

@Component({
  selector: 'auth-teacher-signup',
  templateUrl: './teacher-signup.component.html',
  styleUrls: ['./teacher-signup.component.scss']
})
export class TeacherSignupComponent implements OnInit {
  form = this.fb.group({
    fullName: ['karim', [Validators.required]],
    username: ['karim', [Validators.required]],
    email: ['karim@gmail.com', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    mobileNumber: ['01097628565', [Validators.required, Validators.pattern(/^[+()\d-]+$/)]],
    birthDate: ['1990-12-20T02:34:43.869Z', [Validators.required]],
    gender: [1, Validators.required],
    password: ['1234', [Validators.required]],
    confirmPassword: ['1234', [Validators.required]]
  })

  constructor(private fb: FormBuilder, private store: Store<any>, private actions: Actions, private router: Router) { }

  ngOnInit(): void {
  }

  signup(){
    const user: User = {
      password: this.form.value.password,
      username: this.form.value.username,
      fullName: this.form.value.fullName,
      email: this.form.value.email,
      mobileNumber: {
       number: this.form.value.mobileNumber
      },
      birthDate: this.form.value.birthDate,
      gender: this.form.value.gender,
    } as User

    this.store.dispatch(teacherSignup({ user }))

    this.actions.pipe(ofType(teacherSignupSuccess), take(1))
      .subscribe(res=>{
        this.router.navigate([''])
      })
  }
}

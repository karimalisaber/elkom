import { take } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { studentSignup, studentSignupSuccess } from './../../../../store/session/session.actions';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserRoleEnum } from 'src/app/models/user';
import { loadGrades } from 'src/app/store/lookups/grades/actions';
import { SelectLookup } from 'src/app/store/lookups';
import { User } from 'src/app/store/session/session.model';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-student-signup',
  templateUrl: './student-signup.component.html',
  styleUrls: ['./student-signup.component.scss']
})
export class StudentSignupComponent implements OnInit {
  grades$ = this.store.pipe(select(SelectLookup().grades.all))

  form = this.fb.group({
    fullName: ['karim saber', [Validators.required]],
    gradeId: ['', [Validators.required]],
    email: ['karim@gmail.com', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    phoneNumber: ['01097628565', [Validators.required, Validators.pattern(/^[+()\d-]+$/)]],
    birthDate: [null, [Validators.required]],
    gender: [1, Validators.required],
    password: ['1234', [Validators.required]],
    confirmPassword: ['1234', [Validators.required]]
  })

  constructor(private fb: FormBuilder, private store: Store<any>, private actions: Actions, private router: Router) { }

  ngOnInit(): void {
    this.dispatcher()

  }

  dispatcher() {
    this.store.dispatch(loadGrades())
  }

  signup() {
    const user: User = {
      password: this.form.value.password,
      username: this.form.value.email,
      fullName: this.form.value.fullName,
      email: this.form.value.email,
      phoneNumber: this.form.value.phoneNumber,
      birthDate: this.form.value.birthDate,
      gender: this.form.value.gender,
      gradeId: this.form.value.gradeId
    } as User

    this.store.dispatch(studentSignup({ user }))

    this.actions.pipe(ofType(studentSignupSuccess), take(1))
      .subscribe(res=>{
        console.log(res)
        this.router.navigate([''])
      })
  
  }

}

import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserRoleEnum } from 'src/app/models/user';
import { loadGrades } from 'src/app/store/lookups/grades/actions';
import { SelectLookup } from 'src/app/store/lookups';

@Component({
  selector: 'auth-student-signup',
  templateUrl: './student-signup.component.html',
  styleUrls: ['./student-signup.component.scss']
})
export class StudentSignupComponent implements OnInit {
  grades$ = this.store.pipe(select(SelectLookup().grades.all))
  
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

  constructor(private fb: FormBuilder, private store: Store<any>) { }

  ngOnInit(): void {
    this.dispatcher()
    this.grades$.subscribe(Res=>{
      console.log(Res,'koko')
    })
  }

  dispatcher() {
    this.store.dispatch(loadGrades())
  }

  signup() {

  }

}

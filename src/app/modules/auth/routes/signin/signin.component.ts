import { login, loginSuccess } from './../../../../store/session/session.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/store/session/session.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private store : Store<any>
    ) { }

  ngOnInit(): void {

  }

  signIn(){
    const user = this.form.value as User; 

    this.store.dispatch(login({user}))
    

  }

}

import { FormBuilder } from '@angular/forms';
import { User } from './../../../../../store/session/session.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {
  @Input() user : User
  form ;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form =  this.fb.group({
      
    })
  }

}

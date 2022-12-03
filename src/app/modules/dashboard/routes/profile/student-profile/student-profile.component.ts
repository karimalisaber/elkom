import { loadGrades } from './../../../../../store/lookups/grades/actions';
import { select, Store } from '@ngrx/store';
import { FormBuilder } from '@angular/forms';
import { User } from './../../../../../store/session/session.model';
import { Component, Input, OnInit } from '@angular/core';
import { SelectLookup } from 'src/app/store/lookups';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.scss']
})
export class StudentProfileComponent implements OnInit {
  @Input() user: User
  grades$ = this.store.pipe(select(SelectLookup().grades.all))
  grade;
  constructor(
    private fb: FormBuilder,
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    this.dispactcher()
    this.grade = this.user.studentDetails.grade.id;
    this.grades$.subscribe(res => {
      // con
    })
  }

  dispactcher() {
    this.store.dispatch(loadGrades())
  }


}

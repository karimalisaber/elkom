import { Specialty } from './../../../../store/lookups/specialities/model';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { loadSpecialties } from 'src/app/store/lookups/specialities/actions';
import { SelectLookup } from 'src/app/store/lookups';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.scss']
})
export class TeacherDetailsComponent implements OnInit {
  specialties$ = this.store.pipe(select(SelectLookup().specialties.all))

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.dispatcher()
  }

  dispatcher() {
    this.store.dispatch(loadSpecialties())
  }

  checkChange(e: any, tags: any){

  }
}


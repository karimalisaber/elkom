import { loadTeacher } from './../../../../store/lookups/teachers/actions';
import { Specialty } from './../../../../store/lookups/specialities/model';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { loadSpecialties } from 'src/app/store/lookups/specialities/actions';
import { SelectLookup } from 'src/app/store/lookups';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.scss']
})
export class TeacherDetailsComponent implements OnInit {
  specialties$ = this.store.pipe(select(SelectLookup().specialties.all))
  id = this.route.snapshot.paramMap.get('id')
  question$ = this.store.pipe(select(SelectLookup().questions.by_id(this.id)))
  constructor(private store: Store<any>, private route: ActivatedRoute) { }



  ngOnInit(): void {
    this.dispatcher()
  }

  dispatcher() {
    this.store.dispatch(loadSpecialties())
    this.store.dispatch(loadTeacher({id: this.id}))
  
  }

  checkChange(e: any, tags: any){
  }
}


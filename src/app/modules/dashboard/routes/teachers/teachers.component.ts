import { loadTeacher, loadTeachers } from './../../../../store/lookups/teachers/actions';
import { Component, OnInit } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { SelectLookup } from 'src/app/store/lookups';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {
  teachers$ = this.store.pipe(select(SelectLookup().teachers.all))
  isLoaded$ = this.store.pipe(select(SelectLookup().teachers.loaded))

  constructor(
    private translateService: TranslateService,
    private store: Store<any>,
    private actions: Actions
  ) { }

  ngOnInit(): void {
    this.dispatcher()
  }

  dispatcher(){
    this.store.dispatch(loadTeachers()) 
  }


}

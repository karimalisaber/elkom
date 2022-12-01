import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { SelectLookup } from 'src/app/store/lookups';
import { loadQuestion } from './../../../../store/lookups/questions/actions';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent implements OnInit {
  id = this.route.snapshot.paramMap.get('id')
  question$ = this.store.pipe(select(SelectLookup().questions.by_id(this.id)))
  constructor(private store: Store<any>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.question$.subscribe(res=>{
      console.log(res,'by id')
    })
    
    this.dispatcher()
  }

  dispatcher() {
    this.store.dispatch(loadQuestion({id: this.id}))
  }

}

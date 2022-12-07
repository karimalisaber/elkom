import { combineLatest, map } from 'rxjs';
import { selectRole, selectUser, selectIsLogIN } from './../../../../store/session/session.reducer';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { SelectLookup } from 'src/app/store/lookups';
import { loadQuestion, answerQuestion } from './../../../../store/lookups/questions/actions';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent implements OnInit {
  id = this.route.snapshot.paramMap.get('id')
  question$ = this.store.pipe(select(SelectLookup().questions.by_id(this.id)))
  answerText;
  isLogIn$ = this.store.pipe(select(selectIsLogIN))
  hasAnswer$ = combineLatest([this.store.pipe(select(selectUser)), this.question$ ])
    .pipe(map(([user, question])=> question?.answers.some(answer=> answer.answerdById === user.id)))
  
    role$ = this.store.pipe(select(selectRole))
    constructor(private store: Store<any>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dispatcher()
  }

  dispatcher() {
    this.store.dispatch(loadQuestion({id: this.id}))
  }


  answerQuestion(){
  
    this.store.dispatch(answerQuestion({questionId: this.id, text: this.answerText}))
  }

}

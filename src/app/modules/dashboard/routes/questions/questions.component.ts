import { loadMyQuestions } from './../../../../store/lookups/myquestions/actions';
import { ActivatedRoute } from '@angular/router';
import { SelectLookup } from 'src/app/store/lookups';
import { loadQuestions } from './../../../../store/lookups/questions/actions';
import { Component, OnInit } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { take, map, Observable } from 'rxjs';
import { AskQuestionComponent } from '../../components/ask-question/ask-question.component';
import { loadTags } from './../../../../store/lookups/tags/actions';
import { selectRole } from 'src/app/store/session/session.reducer';
import { Question } from 'src/app/store/lookups/questions/model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  questions$ : Observable<Question[]>;
  isLoaded$ = this.store.pipe(select(SelectLookup().questions.loaded))
  role$ = this.store.pipe(select(selectRole))
  isMyQuestions = this.route.snapshot.data['my']

  constructor(
    private modal: NzModalService,
    private translateService: TranslateService,
    private store: Store<any>,
    private actions: Actions,
    private route: ActivatedRoute
  ) { 
    if(this.isMyQuestions){
      this.questions$ = this.store.pipe(select(SelectLookup().myQuestions.all));
    }else{
      this.questions$ = this.store.pipe(select(SelectLookup().questions.all));

    }
  }

  ngOnInit(): void {
    this.dispatcher()


  }

  dispatcher(){
    this.store.dispatch(loadTags()) // inside child
  
    this.store.dispatch(loadQuestions())
    this.store.dispatch(loadMyQuestions())
  }

  openAskQuestionModal() {
    this.modal.create({
      nzTitle: this.translateService.instant("questionDetails"),
      nzContent: AskQuestionComponent, 
      nzWidth: '80%',
      nzOkText: this.translateService.instant("submit"),
      nzOkDisabled:  false,
      nzCancelText: this.translateService.instant("cancel"),
      nzClosable: false
    })
      .afterClose
      .pipe(take(1))
      .subscribe((state) => {
        // do the logic here
      })
  }


}

import { Component, OnInit } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { take } from 'rxjs';
import { AskQuestionComponent } from '../../components/ask-question/ask-question.component';
import { loadTags } from './../../../../store/lookups/tags/actions';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  constructor(
    private modal: NzModalService,
    private translateService: TranslateService,
    private store: Store<any>,
    private actions: Actions
  ) { }

  ngOnInit(): void {
    this.dispatcher()
  }

  dispatcher(){
    this.store.dispatch(loadTags())
  }

  openAskQuestionModal() {
    this.modal.create({
      nzTitle: this.translateService.instant("questionDetails"),
      nzContent: AskQuestionComponent, 
      nzWidth: '80%',
      nzOkText: this.translateService.instant("submit"),
      nzOkDisabled:  true,
      nzCancelText: this.translateService.instant("cancel"),
      nzClosable: false,
    })
      .afterClose
      .pipe(take(1))
      .subscribe((state) => {
        // do the logic here
      })
  }


}

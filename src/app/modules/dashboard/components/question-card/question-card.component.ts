import { selectUser } from './../../../../store/session/session.reducer';
import { User } from './../../../../store/session/session.model';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/store/lookups/questions/model';
import { AskQuestionComponent } from '../ask-question/ask-question.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {
  @Input() question!: Question;
  user$ = this.store.pipe(select(selectUser))

  constructor(private modal: NzModalService, private translate: TranslateService, private store: Store<any>) { }

  ngOnInit(): void {
  }

  updateQuestion() {
      this.modal.create({
        nzTitle: this.translate.instant("editQuestion"),
        nzContent: AskQuestionComponent,
        nzWidth: '80%',
        nzOkText: this.translate.instant("edit"),
        nzOkDisabled: false,
        nzCancelText: this.translate.instant("cancel"),
        nzClosable: false,
        nzComponentParams: {question: this.question}
      })
      
        .afterClose
        .pipe(take(1))
        .subscribe((state) => {
          // do the logic here
        })
    }
}

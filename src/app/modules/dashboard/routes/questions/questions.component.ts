import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { take } from 'rxjs';
import { AskQuestionComponent } from '../../components/ask-question/ask-question.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  constructor(
    private modal: NzModalService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
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

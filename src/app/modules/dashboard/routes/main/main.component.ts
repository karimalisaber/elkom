import { AskQuestionComponent } from './../../components/ask-question/ask-question.component';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { take } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

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
      nzOkText: this.translateService.instant("ask"),
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

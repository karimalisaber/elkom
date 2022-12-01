import { Component, Input, OnInit } from '@angular/core';
import { Answer, Question } from 'src/app/store/lookups/questions/model';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss']
})
export class QuestionAnswerComponent implements OnInit {
  @Input() answers: Answer[] = []

  constructor(
  ) { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

type UserType = 'student' | 'teacher'

@Component({
  selector: 'auth-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  type: UserType = this.route.snapshot.paramMap.get('type') as UserType

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}

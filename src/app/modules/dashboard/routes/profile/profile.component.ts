import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';
import { getUser } from 'src/app/store/session/session.actions';
import { selectSession } from './../../../../store/root.store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$ = this.store.pipe(select(selectSession), map(res=> res.user))
  // role$ = this.store.pipe(select(selectRole))

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    this.dispatcher()

  }

  dispatcher() {
    this.store.dispatch(getUser())
  }

}

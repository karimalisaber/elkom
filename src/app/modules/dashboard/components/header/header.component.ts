import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { logout } from 'src/app/store/session/session.actions';
import { selectUser } from './../../../../store/session/session.reducer';

@Component({
  selector: 'dashboard-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user$ = this.store.pipe(select(selectUser));
  constructor(private store: Store<any>) { }

  ngOnInit(): void {
  }

  logout(){
    this.store.dispatch(logout())
  }

}

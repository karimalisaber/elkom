import { map } from 'rxjs';
import { selectUser } from './../../../../store/session/session.reducer';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isLogIn$ = this.store.pipe(select(selectUser), map(res=> !!res?.username))

  constructor(
    private store: Store<any>
  ) { 
   
  }

  ngOnInit(): void {
  }

}

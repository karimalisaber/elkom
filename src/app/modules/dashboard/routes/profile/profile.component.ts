import { loadAvatar, updateAvatar } from './../../../../store/session/avatar/actions';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { selectUserDetails } from 'src/app/store/session';
import { getUser } from 'src/app/store/session/session.actions';
import { selectSession } from './../../../../store/root.store';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$ = this.store.pipe(select(selectSession), map(res=> res.user))
  

  constructor(
    private store: Store<any>
  ) {
    
   }

  ngOnInit(): void {
    this.user$.pipe(take(1)).subscribe(res=>{
      this.store.dispatch(loadAvatar({url: res.profileUrl}))
      
    })
    this.dispatcher()

  }

  dispatcher() {
    this.store.dispatch(getUser())
  }

  onUploadProfileImg(files: File[]){
    // console.log($event,)
    const body = new FormData()
    body.append('file' , files[0])

    this.store.dispatch(updateAvatar({file: body}))
  }
}

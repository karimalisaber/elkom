import { loadAvatar, updateAvatar } from './../../../../store/session/avatar/actions';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';
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
  // role$ = this.store.pipe(select(selectRole))

  constructor(
    private store: Store<any>
  ) {
    this.store.pipe(select(selectUserDetails().avatar.item)).subscribe(res=>{
      console.log(res,'koko')
    })
   }

  ngOnInit(): void {
    this.dispatcher()

  }

  dispatcher() {
    this.store.dispatch(getUser())
    this.store.dispatch(loadAvatar())
  }

  onUploadProfileImg(files: File[]){
    // console.log($event,)
    console.log(files[0])
    const body = new FormData()
    body.append('file' , files[0])

    this.store.dispatch(updateAvatar({file: body}))
  }
}

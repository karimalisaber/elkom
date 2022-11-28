import { Store, select } from '@ngrx/store';
import { ToastrService } from './services/toastr.service';
import { LocalizationService } from './services/localization.service';
import { Component } from '@angular/core';
import { selectSession } from './store/root.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private localization: LocalizationService,
    private toastr: ToastrService,
    private store: Store<any>
    ){
    this.localization.setLanguage('en');
    this.toastr.init()

    this.store.pipe(select(selectSession)).subscribe(res=>{
      console.log(res,'session')
    })
  }
}

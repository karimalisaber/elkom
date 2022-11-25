import { ToastrService } from './services/toastr.service';
import { LocalizationService } from './services/localization.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private localization: LocalizationService,
    private toastr: ToastrService
    ){
    this.localization.setLanguage('en');
    this.toastr.init()
  }
}

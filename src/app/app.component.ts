import { LocalizationService } from './services/localization.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private localization: LocalizationService){
    this.localization.setLanguage('ar')
  }
}

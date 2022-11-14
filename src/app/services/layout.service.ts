import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Spinners } from '../models/spinners';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private spinnerSubject = new Subject();
  private spinnerSubjectAction = this.spinnerSubject.asObservable();

  constructor() {
  }

  showSpinner(status = Spinners.SQUER_JELLY_BOX){
    this.spinnerSubject.next(status);
  }

  hideSpinner(){
    this.spinnerSubject.next(null);
  }

  getSpinnerStatus(): Observable<any>{
      return this.spinnerSubjectAction;
  }
}

import { Subject, BehaviorSubject, combineLatest, map } from 'rxjs';
import { loadSpecialties } from 'src/app/store/lookups/specialities/actions';
import { Store, select } from '@ngrx/store';
import { Specialty } from './../../../../store/lookups/specialities/model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SelectLookup } from 'src/app/store/lookups';

@Component({
  selector: 'app-add-specialties',
  templateUrl: './add-specialties.component.html',
  styleUrls: ['./add-specialties.component.scss']
})
export class AddSpecialtiesComponent implements OnInit {
  @Output() change = new EventEmitter<Specialty[]>()
  specialties$ = this.store.pipe(select(SelectLookup().specialties.all))
  selected$ = new BehaviorSubject<Specialty[]>([]);
  filtered$ = combineLatest([this.selected$, this.specialties$])
    .pipe(map(([selected, all])=> all.filter(item=> !selected.some(selectedItem=> selectedItem.id === item.id))))
  toggle$ = new Subject<{ id: string, type: 'add' | 'remove' }>()
  

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.dispatcher()
    this.filtered$.subscribe(res=>{
      console.log(res,'filtered')
    })
    this.specialties$.subscribe(res => {
      console.log(res, 'specialties')
    })
  }

  dispatcher() {
    this.store.dispatch(loadSpecialties())
  }

  add(specialty: Specialty) {
    
    this.selected$.next([...this.selected$.value , specialty])
    this.change.next(this.selected$.value)
  }


  remove(specialty: Specialty) {
    const newValue = this.selected$.value.filter(res=> res.id !==specialty.id)
    this.selected$.next([...newValue])
    this.change.next(this.selected$.value)

  }



}

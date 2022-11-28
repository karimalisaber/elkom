import { map, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Tag } from './../../../../store/lookups/tags/model';
import { SelectLookup } from 'src/app/store/lookups';

export  interface ExtendedTag  { selected: boolean; id: string; title: string; description: string; }

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  selectedIndex = 0;
  abc: string = '';
  leftTabIdx = 0;
  atStart = true;
  atEnd = false
  @Output() tagChanged = new EventEmitter();
  tags! : ExtendedTag[]

  @HostListener("wheel", ["$event"])
    public onScroll(event: any) {
      event.preventDefault()
      event.stopPropagation();
      let wheelDelta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
      this.scrollTab(-wheelDelta, this.tags)
    }


  constructor(
    private store: Store<any>
  ) { }

  ngOnInit(): void {
      this.abc = `translateX(0px)`
  
      this.store.pipe(select((SelectLookup().tags.all)), map(res=> res.map(re=> ({...re, selected: false})) )) .subscribe(res=>{
        this.tags = res  as ExtendedTag[]
      })
    }

  checkChange(e: boolean, tags: any[]) {
    let TagsId = tags.filter(res => !!res.selected).map(res => res.id).join('&TagId=')

    this.tagChanged.next(TagsId)
  }



  selectTab(index: number) {
    this.selectedIndex = index
  }

  scrollTab(x: number, tags: any) {
    if (this.atStart && x < 0 || this.atEnd && x > 0) {
      return
    }

    this.leftTabIdx = this.leftTabIdx + x
    this.abc = `translateX(${(this.leftTabIdx) * 70}px)`
    this.atStart = this.leftTabIdx === 0
    this.atEnd = this.leftTabIdx === tags.length - 1
  }
}

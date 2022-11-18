import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';

interface Tag{
  selected?: boolean
  title: string
}

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tags: Array<Tag> = [
    {title: 'test tag '},
    {title: 'test tag '},
    {title: 'test tag '},
    {title: 'test tag '},
    {title: 'test tag '}
  ];
  selectedIndex = 0;
  abc: string = '';
  leftTabIdx = 0;
  atStart = true;
  atEnd = false
  @Output() tagChanged = new EventEmitter();


  @HostListener("wheel", ["$event"])
    public onScroll(event: any) {
      event.preventDefault()
      event.stopPropagation();
      let wheelDelta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
      this.scrollTab(-wheelDelta, this.tags)
    }


  constructor(

  ) { }

  ngOnInit(): void {
      this.abc = `translateX(0px)`
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

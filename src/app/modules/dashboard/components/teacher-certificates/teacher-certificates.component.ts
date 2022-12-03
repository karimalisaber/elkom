import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

interface DataItem {
  name: string;
  age: number;
  address: string;
}

interface ColumnItem {
  name: string;

}

@Component({
  selector: 'app-teacher-certificates',
  templateUrl: './teacher-certificates.component.html',
  styleUrls: ['./teacher-certificates.component.scss']
})
export class TeacherCertificatesComponent {
  constructor(private translate: TranslateService){}
  listOfColumns: ColumnItem[] = [
    {
      name: this.translate.instant('title'),
    },
    {
      name: this.translate.instant('specialty'),
    },
    {
      name: this.translate.instant('description'),
  
    },
    {
      name: this.translate.instant('file'),
    }
  ];
  listOfData: DataItem[] = [
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    },
    {
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park'
    }
  ];
}

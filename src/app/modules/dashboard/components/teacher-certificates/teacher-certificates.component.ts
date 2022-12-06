import { NzModalService } from 'ng-zorro-antd/modal';
import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { AddCertificateComponent } from '../add-certificate/add-certificate.component';
import { take } from 'rxjs';

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
  constructor(private translate: TranslateService, private modal : NzModalService){}
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

  ];


  addCertificate(){
      this.modal.create({
        nzTitle: this.translate.instant("addNewCertificate"),
        nzContent: AddCertificateComponent, 
        nzWidth: '30%',
        nzOkText: this.translate.instant("submit"),
        nzOkDisabled:  false,
        nzCancelText: this.translate.instant("cancel"),
        nzClosable: false,
        
      })
        .afterClose
        .pipe(take(1))
        .subscribe((state) => {
          // do the logic here
        })
    
  }
}

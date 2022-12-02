import { TranslateModule } from '@ngx-translate/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NoDataComponent } from './components/no-data/no-data.component';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzBadgeModule } from 'ng-zorro-antd/badge';


const importsExports = [
  NzGridModule,
  NzButtonModule,
  NzAutocompleteModule,
  ReactiveFormsModule,
  NzSelectModule,
  NzUploadModule,
  NzModalModule,
  NzToolTipModule,
  NgSelectModule,
  NzIconModule,
  NzEmptyModule,
  NzBadgeModule
]
const exportsDeclarations =[
  NoDataComponent

]
@NgModule({
  declarations: [
    ...exportsDeclarations
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ...importsExports
  ],
  exports: [
    ...importsExports,
    ...exportsDeclarations
  ],
  providers:[
  ]
})
export class SharedModule { }

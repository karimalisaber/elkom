import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzModalModule } from 'ng-zorro-antd/modal';


const importsExports = [
  NzGridModule,
  NzButtonModule,
  NzAutocompleteModule,
  ReactiveFormsModule,
  NzSelectModule,
  NzUploadModule,
  NzModalModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...importsExports
  ],
  exports: [
    ...importsExports
  ]
})
export class SharedModule { }

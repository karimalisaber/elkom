import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';

const importsExports = [
  NzGridModule
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

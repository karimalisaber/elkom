import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import {
  PlusOutline, ArrowLeftOutline, CloseOutline
} from '@ant-design/icons-angular/icons';

export const icons = [PlusOutline, ArrowLeftOutline, CloseOutline];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [
    { provide: NZ_ICONS, useValue: icons }
  ]
})
export class IconsProviderModule {
}

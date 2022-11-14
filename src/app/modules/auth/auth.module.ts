import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';

import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './routes/signin/signin.component';
import { SignupComponent } from './routes/signup/signup.component';
import { ContainerComponent } from './routes/container/container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { TeacherSignupComponent } from './components/teacher-signup/teacher-signup.component';
import { StudentSignupComponent } from './components/student-signup/student-signup.component';
import { NzSelectModule } from 'ng-zorro-antd/select';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    ContainerComponent,
    TeacherSignupComponent,
    StudentSignupComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NzFormModule,
    NzTypographyModule,
    NzInputModule,
    NzDatePickerModule,
    ReactiveFormsModule,
    NzSelectModule,
    TranslateModule.forChild(),
  ]
})
export class AuthModule { }

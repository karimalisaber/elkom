import { SharedModule } from './../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './routes/main/main.component';
import { QuestionsComponent } from './routes/questions/questions.component';
import { TeachersComponent } from './routes/teachers/teachers.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { ContainerComponent } from './components/container/container.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { TagsComponent } from './components/tags/tags.component';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzInputModule } from 'ng-zorro-antd/input';
import { QuestionCardComponent } from './components/question-card/question-card.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { QuestionDetailsComponent } from './routes/question-details/question-details.component';
import { TeacherCardComponent } from './routes/teachers/teacher-card/teacher-card.component';
import { TeacherDetailsComponent } from './routes/teacher-details/teacher-details.component';
  
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TeacherProfileComponent } from './routes/profile/teacher-profile/teacher-profile.component';
import { StudentProfileComponent } from './routes/profile/student-profile/student-profile.component';
import { UserInfoComponent } from './routes/profile/user-info/user-info.component';
import { AskQuestionComponent } from './components/ask-question/ask-question.component';

@NgModule({
  declarations: [
    MainComponent,
    QuestionsComponent,
    TeachersComponent,
    ProfileComponent,
    ContainerComponent,
    SidebarComponent,
    HeaderComponent,
    TagsComponent,
    QuestionCardComponent,
    QuestionDetailsComponent,
    TeacherCardComponent,
    TeacherDetailsComponent,
    TeacherProfileComponent,
    StudentProfileComponent,
    UserInfoComponent,
    AskQuestionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
    TranslateModule.forChild(),
    NzIconModule,
    NzTagModule,
    NzInputModule,
    NzDividerModule
  ]
})
export class DashboardModule { }

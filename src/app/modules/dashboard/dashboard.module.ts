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

@NgModule({
  declarations: [
    MainComponent,
    QuestionsComponent,
    TeachersComponent,
    ProfileComponent,
    ContainerComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TranslateModule.forChild()
  ]
})
export class DashboardModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './routes/main/main.component';
import { QuestionsComponent } from './routes/questions/questions.component';
import { TeachersComponent } from './routes/teachers/teachers.component';
import { ProfileComponent } from './routes/profile/profile.component';



@NgModule({
  declarations: [
    MainComponent,
    QuestionsComponent,
    TeachersComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }

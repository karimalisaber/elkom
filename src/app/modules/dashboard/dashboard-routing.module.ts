import { TeacherDetailsComponent } from './routes/teacher-details/teacher-details.component';
import { QuestionDetailsComponent } from './routes/question-details/question-details.component';
import { ProfileComponent } from './routes/profile/profile.component';
import { TeachersComponent } from './routes/teachers/teachers.component';
import { QuestionsComponent } from './routes/questions/questions.component';
import { ContainerComponent } from './components/container/container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '', component: ContainerComponent, children: [
      {
        path: '', redirectTo: 'questions', pathMatch: 'full'
      },
      {
        
        path: 'questions', component: QuestionsComponent
      },
      {
        path: 'questions/details', component: QuestionDetailsComponent
      },

      {
        path: 'myquestions', component: QuestionsComponent
      },
      {
        path: 'teachers', component: TeachersComponent
      },
      {
        path: 'teachers/teacher', component: TeacherDetailsComponent
      },
      {
        path: 'profile', component: ProfileComponent
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
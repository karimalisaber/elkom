import { ProfileComponent } from './routes/profile/profile.component';
import { TeachersComponent } from './routes/teachers/teachers.component';
import { QuestionsComponent } from './routes/questions/questions.component';
import { MainComponent } from './routes/main/main.component';
import { ContainerComponent } from './components/container/container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '', component: ContainerComponent
  },
  {
    path: 'dashboard', component: MainComponent
  },
  {
    path: 'questions', component: QuestionsComponent
  },
  {
    path: 'myquestions', component: QuestionsComponent
  },
  {
    path: 'teachers', component: TeachersComponent
  },
  {
    path: 'profile', component: ProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
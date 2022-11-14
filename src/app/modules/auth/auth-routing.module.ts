import { SignupComponent } from './routes/signup/signup.component';
import { SigninComponent } from './routes/signin/signin.component';
import { ContainerComponent } from './routes/container/container.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: ContainerComponent, children: [
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

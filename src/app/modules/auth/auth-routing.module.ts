import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupMenuComponent } from './routes/signup-menu/signup-menu.component';
import { SigninComponent } from './routes/signin/signin.component';
import { SignupComponent } from './routes/signup/signup.component';

const routes: Routes = [
  {
    path: 'signup', component: SignupMenuComponent
  },
  { path: 'signin', component: SigninComponent },
  { path: 'signup/:type', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
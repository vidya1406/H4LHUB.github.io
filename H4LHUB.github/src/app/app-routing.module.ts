import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctordashboardComponent } from './doctordashboard/doctordashboard.component';
import { ReceptionistdashboardComponent } from './receptionistdashboard/receptionistdashboard.component';
import { PharmacistdashboardComponent } from './pharmacistdashboard/pharmacistdashboard.component';

const routes: Routes = [
  {
    path: '',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'doctordashboard',
    component: DoctordashboardComponent,
  },
  {
    path: 'receptionistdashboard',
    component: ReceptionistdashboardComponent,
  },
  {
    path: 'pharmacistdashboard',
    component: PharmacistdashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

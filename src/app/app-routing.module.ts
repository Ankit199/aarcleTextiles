import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ForgotpasswordComponent } from './account/forgotpassword/forgotpassword.component';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UserinterfaceComponent } from './customer/userinterface/userinterface.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'in' },
  {
    path: 'in',
    component: UserinterfaceComponent,
    loadChildren: () =>
      import('./customer/customer.module').then((m) => m.CustomerModule),
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin',pathMatch: 'full', component: DashboardComponent },
  { path: 'forgot-password',pathMatch: 'full', component: ForgotpasswordComponent },
  { path: 'notfound',pathMatch: 'full', component: NotfoundComponent },
  { path: '**', redirectTo: 'notfound' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

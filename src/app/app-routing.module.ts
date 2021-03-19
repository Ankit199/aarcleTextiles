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
  { path: 'admin', component: DashboardComponent, loadChildren: () =>
             import('./admin/dashboard/dashboard.module').then((m) => m.DashboardModule)
    },
  { path: 'forgot-password',pathMatch: 'full', component: ForgotpasswordComponent },
  { path: 'notfound',pathMatch: 'full', component: NotfoundComponent },
  { path: '**', redirectTo: 'notfound' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    onSameUrlNavigation: 'reload',
    initialNavigation: 'enabled'
}),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { SubheadertabComponent } from './customer/subheadertab/subheadertab.component';
import { ForgotpasswordComponent } from './account/forgotpassword/forgotpassword.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { WebStorageModule } from 'ngx-store';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoadingScreenInterceptor } from "./shared/loading.interceptor";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, 
    SignupComponent, 
    SubheadertabComponent, ForgotpasswordComponent, NotfoundComponent    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,  
    WebStorageModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })  
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingScreenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

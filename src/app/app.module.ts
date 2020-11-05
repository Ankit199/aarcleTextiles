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
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, 
    SignupComponent, 
    SubheadertabComponent, ForgotpasswordComponent, NotfoundComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  
    WebStorageModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

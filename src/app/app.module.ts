import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { SubheadertabComponent } from './customer/subheadertab/subheadertab.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, 
    SignupComponent, 
    SubheadertabComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

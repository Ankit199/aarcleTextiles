import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HeadertabComponent } from './customer/headertab/headertab.component';
import { SubheadertabComponent } from './customer/subheadertab/subheadertab.component';

import { FootertabComponent } from './customer/footertab/footertab.component';
import { ContactusComponent } from './customer/contactus/contactus.component';
import { DistributerComponent } from './customer/distributer/distributer.component';
import { SaleComponent } from './customer/sale/sale.component';
import { MensproductComponent } from './customer/mensproduct/mensproduct.component';
import { WomensproductComponent } from './customer/womensproduct/womensproduct.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, 
    SignupComponent,
    DashboardComponent,
    HeadertabComponent,
    SubheadertabComponent,    
    FootertabComponent,    
    ContactusComponent,    
    DistributerComponent,    
    SaleComponent,    
    MensproductComponent,    
    WomensproductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

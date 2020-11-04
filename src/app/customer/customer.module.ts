import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleComponent } from './sale/sale.component';
import { MensproductComponent } from './mensproduct/mensproduct.component';
import { WomensproductComponent } from './womensproduct/womensproduct.component';
import { DistributerComponent } from './distributer/distributer.component';
import { ContactusComponent } from './contactus/contactus.component';
import { DashboardComponent } from '../admin/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { HeadertabComponent } from './headertab/headertab.component';
import { FootertabComponent } from './footertab/footertab.component';
import { PrivacypoliceComponent } from './privacypolice/privacypolice.component';
import { SingleproductComponent } from './singleproduct/singleproduct.component';
import { UserinterfaceComponent } from './userinterface/userinterface.component';
import { BrowserModule } from '@angular/platform-browser';


const   routeCoustomer:Routes=[ 
  { path: '', component: HomeComponent,pathMatch:"full",outlet:'customer'},
{ path: 'policy', component: PrivacypoliceComponent,outlet:'customer'},
{ path: 'contact', component: ContactusComponent},
{ path: 'distributor', component: DistributerComponent},
{ path: 'mens', component: MensproductComponent},
{ path: 'womens', component: WomensproductComponent},
{ path: 'sale', component: SaleComponent},
{ path: 'productview', component: SingleproductComponent}
]

@NgModule({
  declarations: [ UserinterfaceComponent,
   HomeComponent,SaleComponent,MensproductComponent,WomensproductComponent,
   DistributerComponent,ContactusComponent,DashboardComponent, PrivacypoliceComponent,HeadertabComponent,FootertabComponent
  ],
  imports: [
    CommonModule,        
    RouterModule.forChild(routeCoustomer)
  ],exports:[RouterModule],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CustomerModule { }
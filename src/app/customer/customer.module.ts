import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
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



const   routeCoustomer:Routes=[ 
  { path: '', component: HomeComponent, pathMatch: 'full'},
{ path: 'policy',  pathMatch: 'full',component: PrivacypoliceComponent},
{ path: 'contact', pathMatch: 'full',component: ContactusComponent},
{ path: 'distributor',pathMatch: 'full', component: DistributerComponent},
{ path: 'mens', pathMatch: 'full',component: MensproductComponent},
{ path: 'womens',pathMatch: 'full', component: WomensproductComponent},
{ path: 'sale', pathMatch: 'full',component: SaleComponent},
{ path: 'productview', pathMatch: 'full',component: SingleproductComponent}
]

@NgModule({
  declarations: [ UserinterfaceComponent,
   HomeComponent,SaleComponent,MensproductComponent,WomensproductComponent,
   DistributerComponent,ContactusComponent,DashboardComponent, PrivacypoliceComponent,HeadertabComponent,FootertabComponent
  ],
  imports: [
    CommonModule,        
    RouterModule.forChild(routeCoustomer)
  ],  exports: [RouterModule],
  providers: [ {
      provide: LocationStrategy, 
      useClass: PathLocationStrategy} ],

    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CustomerModule { }
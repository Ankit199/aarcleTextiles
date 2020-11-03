import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleComponent } from './sale/sale.component';
import { MensproductComponent } from './mensproduct/mensproduct.component';
import { WomensproductComponent } from './womensproduct/womensproduct.component';
import { DistributerComponent } from './distributer/distributer.component';
import { ContactusComponent } from './contactus/contactus.component';
import { DashboardComponent } from '../admin/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { HeadertabComponent } from './headertab/headertab.component';
import { FootertabComponent } from './footertab/footertab.component';

const   routeCoustomer:any=[ { path: '', component: HomeComponent}]

@NgModule({
  declarations: [FootertabComponent,HeadertabComponent, HomeComponent,SaleComponent,MensproductComponent,WomensproductComponent,
    DistributerComponent,ContactusComponent,DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routeCoustomer),
  ]
})
export class customerModule { }
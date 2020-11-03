import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleComponent } from './sale/sale.component';
import { MensproductComponent } from './mensproduct/mensproduct.component';
import { WomensproductComponent } from './womensproduct/womensproduct.component';
import { DistributerComponent } from './distributer/distributer.component';
import { ContactusComponent } from './contactus/contactus.component';
import { DashboardComponent } from '../admin/dashboard/dashboard.component';


@NgModule({
  declarations: [SaleComponent,MensproductComponent,WomensproductComponent,DistributerComponent,ContactusComponent,DashboardComponent],
  imports: [
    CommonModule
  ]
})
export class customerModule { }
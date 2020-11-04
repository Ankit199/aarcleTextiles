import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DefaultprofileComponent } from './dashboard/defaultprofile/defaultprofile.component';
import { DashboardComponent } from 'src/app/admin/dashboard/dashboard.component';
import { WishlistComponent } from './dashboard/wishlist/wishlist.component';
import { OrderlistComponent } from './dashboard/orderlist/orderlist.component';
import { OrderdetailComponent } from './dashboard/orderdetail/orderdetail.component';
import { AddressComponent } from './dashboard/address/address.component';

import { ProfileComponent } from './dashboard/profile/profile.component';



const   routeprofile:Routes=[ 
  { path: '', component: DefaultprofileComponent, pathMatch: 'full'},
{ path: 'wishlist',  pathMatch: 'full',component: WishlistComponent},
]

@NgModule({
  declarations: [DefaultprofileComponent, WishlistComponent,OrderlistComponent,OrderdetailComponent,AddressComponent ,ProfileComponent],
  imports: [
    CommonModule,        
    RouterModule.forChild(routeprofile)
  ],  exports: [RouterModule],
  providers: [ {
      provide: LocationStrategy, 
      useClass: PathLocationStrategy} ],

    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DashboardModule { }
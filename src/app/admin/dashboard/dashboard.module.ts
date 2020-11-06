import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { DashboardComponent } from './dashboard.component';
import { NgxEditorModule } from 'ngx-editor';


const   routeAdmin:Routes=[ 
  { path: '', component: IndexComponent, pathMatch: 'full'},
]

@NgModule({
  declarations: [DashboardComponent,IndexComponent,AdminFooterComponent,AdminHeaderComponent,AdminSidebarComponent ],
  imports: [
    CommonModule,  NgxEditorModule,      
    RouterModule.forChild(routeAdmin)
  ],  exports: [RouterModule],
  providers: [ {
      provide: LocationStrategy, 
      useClass: PathLocationStrategy} ],

    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DashboardModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminOverviewComponent } from './components/admin-overview/admin-overview.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisplayAdminProductsComponent } from './components/admin-products/display-admin-products/display-admin-products.component';
import { EditAdminProductsComponent } from './components/admin-products/edit-admin-products/edit-admin-products.component';
import { AddAdminProductsComponent } from './components/admin-products/add-admin-products/add-admin-products.component';
import { AdminSettingsComponent } from './components/admin-settings/admin-settings.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminOverviewComponent,
    DisplayAdminProductsComponent,
    EditAdminProductsComponent,
    AddAdminProductsComponent,
    AdminSettingsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminOverviewComponent } from './components/admin-overview/admin-overview.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisplayAdminProductsComponent } from './components/admin-products/display-admin-products/display-admin-products.component';
import { EditAdminProductComponent } from './components/admin-products/edit-admin-product/edit-admin-product.component';
import { AddAdminProductComponent } from './components/admin-products/add-admin-product/add-admin-product.component';
import { AdminSettingsComponent } from './components/admin-settings/admin-settings.component';
import { DisplayAdminCategoriesComponent } from './components/admin-categories/display-admin-categories/display-admin-categories.component';
import { AddAdminCategoryComponent } from './components/admin-categories/add-admin-category/add-admin-category.component';
import { EditAdminCategoryComponent } from './components/admin-categories/edit-admin-category/edit-admin-category.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminOverviewComponent,
    DisplayAdminProductsComponent,
    EditAdminProductComponent,
    AddAdminProductComponent,
    AdminSettingsComponent,
    DisplayAdminCategoriesComponent,
    AddAdminCategoryComponent,
    EditAdminCategoryComponent
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

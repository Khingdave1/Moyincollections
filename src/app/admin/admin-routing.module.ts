import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminOverviewComponent } from './components/admin-overview/admin-overview.component';
import { AddAdminProductsComponent } from './components/admin-products/add-admin-products/add-admin-products.component';
import { DisplayAdminProductsComponent } from './components/admin-products/display-admin-products/display-admin-products.component';
import { EditAdminProductsComponent } from './components/admin-products/edit-admin-products/edit-admin-products.component';
import { AdminSettingsComponent } from './components/admin-settings/admin-settings.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: AdminOverviewComponent,
        data: {
          title: 'Overview',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'products',
        component: DisplayAdminProductsComponent,
        data: {
          title: 'Products',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'products/add-product',
        component: AddAdminProductsComponent,
        data: {
          title: 'Add Product',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'products/edit-product/:productId',
        component: EditAdminProductsComponent,
        data: {
          title: 'Edit Product',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'settings',
        component: AdminSettingsComponent,
        data: {
          title: 'Settings',
          description: 'Description Meta Tag Content',
        },
      },
      { path: '', redirectTo: '/admin', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

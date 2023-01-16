import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddAdminCategoryComponent } from './components/admin-categories/add-admin-category/add-admin-category.component';
import { DisplayAdminCategoriesComponent } from './components/admin-categories/display-admin-categories/display-admin-categories.component';
import { EditAdminCategoryComponent } from './components/admin-categories/edit-admin-category/edit-admin-category.component';
import { AdminOverviewComponent } from './components/admin-overview/admin-overview.component';
import { AddAdminProductComponent } from './components/admin-products/add-admin-product/add-admin-product.component';
import { DisplayAdminProductsComponent } from './components/admin-products/display-admin-products/display-admin-products.component';
import { EditAdminProductComponent } from './components/admin-products/edit-admin-product/edit-admin-product.component';
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
        component: AddAdminProductComponent,
        data: {
          title: 'Add Product',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'products/edit-product/:productId',
        component: EditAdminProductComponent,
        data: {
          title: 'Edit Product',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'categories',
        component: DisplayAdminCategoriesComponent,
        data: {
          title: 'Categories',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'categories/add-category',
        component: AddAdminCategoryComponent,
        data: {
          title: 'Add Category',
          description: 'Description Meta Tag Content',
        },
      },
      {
        path: 'categories/edit-category/:categoryId',
        component: EditAdminCategoryComponent,
        data: {
          title: 'Edit Category',
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

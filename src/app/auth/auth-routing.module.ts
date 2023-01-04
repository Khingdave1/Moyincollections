import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login',
          description: 'Description Meta Tag Content',
        },
      },
      // {
      //   path: 'products',
      //   component: ProductsComponent,
      //   data: {
      //     title: 'Products',
      //     description: 'Description Meta Tag Content',
      //   },
      // },
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

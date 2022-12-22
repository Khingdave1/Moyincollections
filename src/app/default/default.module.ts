import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { SharedModule } from '../shared/shared.module';
import { HomeHeroComponent } from './components/home-hero/home-hero.component';
import { HomeProductsComponent } from './components/home-products/home-products.component';


@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    ProductsComponent,
    HomeHeroComponent,
    HomeProductsComponent
  ],
  imports: [
    CommonModule,
    DefaultRoutingModule,
    SharedModule
  ]
})
export class DefaultModule { }

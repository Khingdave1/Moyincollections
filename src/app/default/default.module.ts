import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { SharedModule } from '../shared/shared.module';
import { HomeHeroComponent } from './components/home-hero/home-hero.component';
import { HomeProductsComponent } from './components/home-products/home-products.component';
import { HomeAboutComponent } from './components/home-about/home-about.component';
import { HomeContactComponent } from './components/home-contact/home-contact.component';


@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    ProductsComponent,
    HomeHeroComponent,
    HomeProductsComponent,
    HomeAboutComponent,
    HomeContactComponent
  ],
  imports: [
    CommonModule,
    DefaultRoutingModule,
    SharedModule
  ]
})
export class DefaultModule { }

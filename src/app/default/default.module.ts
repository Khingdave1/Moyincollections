import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { SharedModule } from '../shared/shared.module';
import { HomeHeroComponent } from './components/home/home-hero/home-hero.component';
import { HomeAboutComponent } from './components/home/home-about/home-about.component';
import { HomeContactComponent } from './components/home/home-contact/home-contact.component';
import { HomeReviewsComponent } from './components/home/home-reviews/home-reviews.component';
import { HomeProductsComponent } from './components/home/home-products/home-products.component';
import { DisplayProductsComponent } from './components/display-products/display-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';


@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    ProductsComponent,
    HomeHeroComponent,
    HomeAboutComponent,
    HomeContactComponent,
    HomeReviewsComponent,
    HomeProductsComponent,
    DisplayProductsComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    DefaultRoutingModule,
    SharedModule
  ]
})
export class DefaultModule { }

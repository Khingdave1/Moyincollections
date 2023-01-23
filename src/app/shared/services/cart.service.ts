 import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  products: any[] = [];
  constructor() { }

  getProduct() {
    return this.products
  }

  // Save cart
  saveCart() {
    localStorage.setItem('cart_item', JSON.stringify(this.products))
  }

  // Add to cart
  addToCart(product: any) {
    console.log(product);
    
    this.products.push(product)
    this.saveCart()
  }

  loadCart() {
    this.products = JSON.parse(localStorage.getItem('cart_item') as any) || [];
  }

  productInCart(product: any): boolean {
    return this.products.findIndex((x: any) => x.id === product.id) > -1;
  }

  removeProduct(product: any) {
    const index = this.products.findIndex((x: any) => x.id === product.id);

    if (index > -1) {
      this.products.splice(index, 1);
      this.saveCart();
    }
  }

  clearProducts() {
    localStorage.clear();
  }

}

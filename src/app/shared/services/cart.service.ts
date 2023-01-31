 import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  products: any[] = [];
  constructor() { }

  // Get Products
  getProduct() {
    return this.products
  }

  // Save cart
  saveCart() {
    localStorage.setItem('cart_item', JSON.stringify(this.products))
  }

  // Add to cart
  addToCart(product: any) {
    this.loadCart()

    this.products.push(product)
    
    this.saveCart()
  }

  // Load Cart
  loadCart() {
    this.products = JSON.parse(localStorage.getItem('cart_item') as any) || [];
    return this.products
  }

  // Product in Cart
  productInCart(product: any): boolean {
    return this.products.findIndex((x: any) => x.id === product.id) > -1;
  }

  // Remove product
  removeProduct(product: any) {
    const index = this.products.findIndex((x: any) => x.id === product.id);
    
    if (index > -1) {
      this.products.splice(index, 1);
      this.saveCart();
    }
  }
  
  // Clear cart
  clearProducts() {
    localStorage.clear();
  }

}

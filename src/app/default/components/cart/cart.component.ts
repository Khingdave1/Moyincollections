import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  checkoutForm: any = FormGroup;
  loading: boolean = false;
  isFormSubmitted: boolean = false;
  products: any;
  alertMessage: string = '';
  alertColor: string = '';
  isAlert: boolean = false;
  subTotal: number;
  grandTotal: number;
  
  constructor(private formBuilder: FormBuilder, private cartService: CartService) {}

 ngOnInit(): void {
    // category form
    this.checkoutForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });

    // Get cart products from local storage
    this.products = this.cartService.loadCart()
    this.getGrandTotal()
  }

  // Find Sum
  getGrandTotal() {
    // this.value = data;
    this.grandTotal = this.products.reduce((sum: any, product: any) => sum += product.subTotal, 0)
    
    return this.grandTotal
  }


   // Increase Product Quantity
   increment(item: any, index: any) {
    let qty = item.quantity
    let atm = item.price

    qty += 1;
    
    item.subTotal = qty * atm
    item.quantity = qty
    
    this.cartService.saveCart()
    this.getGrandTotal()
  }
  
  // Decrease Product Quantity
  decrement(item: any, index: any) {
    let qty = item.quantity
    let atm = item.price
    
    if(qty > 1) {
      qty -= 1;
    }
    
    item.subTotal = qty * atm
    item.quantity = qty

    this.cartService.saveCart()
    this.getGrandTotal()
  }

  // Change Sub Total
  changeSubTotal(item: any, index: any) {
    const qty = item.quantity
    const atm = item.price

    item.subTotal = qty * atm

    this.cartService.saveCart()
    this.getGrandTotal()
  }

  // Remove item from localstorage
  removeItemFromLocalStorage(product: any): void {
    this.cartService.removeProduct(product)
    this.getGrandTotal()
    // Show alert
    this.showAlert('Item removed from cart', 'success')
  }

  // Checkout 
  checkout() {
    // Start loading
    this.loading = true;

    // Set submitted to true
    this.isFormSubmitted = true;

    // If Form is invalid
    if (this.checkoutForm.invalid) {
      this.loading = false;

      return;
    }

    let payload = {
      fullname: this.checkoutForm.value.fullname,
      email: this.checkoutForm.value.email,
      grandTotal: this.grandTotal
    }

    console.log(payload);
    
  }

  // Show alert
  showAlert(message: string, color: string) {
    // Set message
    this.alertMessage = message;
    // Set color
    this.alertColor = color;
    // Show Alert
    this.isAlert = true;
    // Hide Alert
    setTimeout(() => {
      this.isAlert = false;
    }, 3000);
  }
  
}

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
  items: any;
  alertMessage: string = '';
  alertColor: string = '';
  isAlert: boolean = false;
  quanTotal: number;
  grandTotal: number;
  subTotal: number;
  
  constructor(private formBuilder: FormBuilder, private cartService: CartService) {}

 ngOnInit(): void {
    // category form
    this.checkoutForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });

    // Get cart items from local storage
    // this.items = JSON.parse(localStorage.getItem('cart') || '[]');
    // this.addSubTotal('data')

    let hi = this.cartService.loadCart()
    console.log(hi);
    
  }

  // Find Sum
  addSubTotal(data: any) {
    // this.value = data;
    this.grandTotal = this.items.reduce((sum: any, prod: any) => sum += prod.subTotal, 0)
    console.log(this.grandTotal);
    
    return this.grandTotal
  }


   // Increase Product Quantity
   increment() {
    this.quanTotal += 1;

    // this.totalPrice = this.currentProduct?.price * this.quanTotal
    // return this.totalPrice
  }

  // Decrease Product Quantity
  decrement() {
    if(this.quanTotal > 1) {
      this.quanTotal -= 1;
    }

    // this.totalPrice = this.currentProduct?.price * this.quanTotal
    // return this.totalPrice
  }

  changeSunTotal(item: any, index: any) {
    const qty = item.quantity
    const atm = item.price

    this.subTotal = qty * atm

     
  }

  // input quant value
  // inputQuanValue() {
  //   this.totalPrice = this.currentProduct?.price * this.quanTotal
  //   return this.totalPrice
  // }

  // Remove item from localstorage
  removeItemFromLocalStorage(index: any): void {
    let allData = JSON.parse(localStorage.getItem('cart') || '[]');

    allData.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(allData));
    // Show alert
    this.showAlert('Item removed from cart', 'success')

    this.items = JSON.parse(localStorage.getItem('cart') || '[]');

    this.addSubTotal('')

    // this.ngOnInit()
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

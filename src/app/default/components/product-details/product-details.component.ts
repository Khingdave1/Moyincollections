import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit  {
  
  @Input() currentProduct: any
  @Output() productDetailsModal: EventEmitter<any> = new EventEmitter() 
  quanTotal: number = 1
  totalPrice: number
  alertMessage: string = '';
  alertColor: string = '';
  isAlert: boolean = false;

  constructor(private cartService: CartService) {}
  
  ngOnInit(): void {
    this.totalPrice = this.currentProduct?.price
  }

   // Close Modal
   closeModal() {
    this.productDetailsModal.emit()
  }

  // Increase Product Quantity
  increment() {
    this.quanTotal += 1;

    this.totalPrice = this.currentProduct?.price * this.quanTotal
    return this.totalPrice
  }

  // Decrease Product Quantity
  decrement() {
    if(this.quanTotal > 1) {
      this.quanTotal -= 1;
    }

    this.totalPrice = this.currentProduct?.price * this.quanTotal
    return this.totalPrice
  }

  // input quant value
  inputQuanValue() {
    this.totalPrice = this.currentProduct?.price * this.quanTotal
    return this.totalPrice
  }

  // Add item to localstorage
  addToCart() {
    let payload = {
      id: this.currentProduct.id,
      imageUrl: this.currentProduct.imageUrl,
      name: this.currentProduct.name,
      price: this.currentProduct.price,
      quantity: this.quanTotal,
      subTotal: this.totalPrice
    }
    let allData = this.cartService.loadCart()
    let exist = allData.some((obj: any) => obj.id === payload.id);
    if (!exist) {
      this.cartService.addToCart(payload);
      // Show alert
      this.showAlert('Item added to cart', 'success')

      // Close modal
      setTimeout(() => {
        this.closeModal()
      }, 3000)

    } else {
      this.showAlert('Item already exist in cart', 'warning')
    }
    
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






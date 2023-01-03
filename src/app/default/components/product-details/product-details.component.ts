import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit  {
  
  @Input() currentProduct: any 
  quanTotal: number = 1
  totalPrice: number

  constructor() {}
  
  ngOnInit(): void {

    this.totalPrice = this.currentProduct?.price

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



}

import { Component } from '@angular/core';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.scss']
})
export class DisplayProductsComponent {

  products = [
    {
      id: 1,
      name: 'White marble top side table with T shaped base',
      description: 'Description',
      image: 'assets/img/wall-deco.jpg',
      price: 2000,
      totalQuantity: 4
    },
    {
      id: 2,
      name: 'Lighting',
      description: 'Description',
      image: 'assets/img/lighthing.jpg',
      price: 1000,
      totalQuantity: 4
    },
    {
      id: 3,
      name: 'Vase of flowers',
      description: 'Description',
      image: 'assets/img/vase-flowers.jpg',
      price: 3000,
      totalQuantity: 4
    },
    {
      id: 4,
      name: 'Throw pillows',
      description: 'Description',
      image: 'assets/img/throw-pillows.jpg',
      price: 500,
      totalQuantity: 4
    },
  ]
  isModal: boolean = false
  currentProduct: any

  constructor() {

  }

  // Show product details 
  showProductDetails(product: any) {
    this.isModal = true

    this.currentProduct = product
  }


  hanldeChange() {
    console.log('Click Outside');
    this.isModal = false
    
  }
  

}

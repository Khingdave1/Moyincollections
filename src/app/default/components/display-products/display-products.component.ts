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
      name: 'WHITE MARBLE TOP SIDE TABLE WITH T SHAPED BASE',
      description: 'Description',
      image: '../../../../assets/img/wall-deco.jpg',
      price: 2000,
      totalQuantity: 4
    },
    {
      id: 2,
      name: 'Lighting',
      description: 'Description',
      image: '../../../../assets/img/lighthing.jpg',
      price: 1000,
      totalQuantity: 4
    },
    {
      id: 3,
      name: 'Vase of flowers',
      description: 'Description',
      image: '../../../../assets/img/vase-flowers.jpg',
      price: 3000,
      totalQuantity: 4
    },
    {
      id: 4,
      name: 'Throw pillows',
      description: 'Description',
      image: '../../../../assets/img/throw-pillows.jpg',
      price: 500,
      totalQuantity: 4
    },
  ]

}

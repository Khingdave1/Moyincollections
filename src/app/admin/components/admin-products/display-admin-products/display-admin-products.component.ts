import { Component } from '@angular/core';

@Component({
  selector: 'app-display-admin-products',
  templateUrl: './display-admin-products.component.html',
  styleUrls: ['./display-admin-products.component.scss']
})
export class DisplayAdminProductsComponent {

  products = [
    {
      id: 1,
      name: 'White marble top side table with T shaped base',
      description: 'Description',
      image: 'assets/img/wall-deco.jpg',
      categories: ['Curtain', 'Rug', 'Towel'],
      dateAdded: '20/10/22',
      lastUpdated: '02/01/23',
      status: 'available',
      price: 2000,
      totalQuantity: 4
    },
    {
      id: 2,
      name: 'Lighting',
      description: 'Description',
      image: 'assets/img/lighthing.jpg',
      categories: ['Curtain', 'Rug', 'Towel'],
      dateAdded: '20/10/22',
      lastUpdated: '02/01/23',
      status: 'available',
      price: 1000,
      totalQuantity: 4
    },
    {
      id: 3,
      name: 'Vase of flowers',
      description: 'Description',
      image: 'assets/img/vase-flowers.jpg',
      categories: ['Curtain', 'Rug', 'Towel'],
      dateAdded: '20/10/22',
      lastUpdated: '02/01/23',
      status: 'available',
      price: 3000,
      totalQuantity: 4
    },
    {
      id: 4,
      name: 'Throw pillows',
      description: 'Description',
      image: 'assets/img/throw-pillows.jpg',
      categories: ['Curtain', 'Rug', 'Towel'],
      dateAdded: '20/10/22',
      lastUpdated: '02/01/23',
      status: 'available',
      price: 500,
      totalQuantity: 4
    },
  ]

  dataLoading: boolean = true;

  editProduct(product: any) {

  }
  deleteProduct(product: any) {

  }
  updateProductStatus(product: any) {

  }

}

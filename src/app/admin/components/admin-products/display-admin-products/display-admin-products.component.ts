import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-display-admin-products',
  templateUrl: './display-admin-products.component.html',
  styleUrls: ['./display-admin-products.component.scss']
})
export class DisplayAdminProductsComponent implements OnInit {

  products2 = [
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
      discountedPrice: 200,
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
      discountedPrice: 200,
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
      discountedPrice: 200,
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
      discountedPrice: 200,
      totalQuantity: 4
    },
  ]
  dataLoading: boolean = true;
  products: any;

  constructor(
    private productService: ProductService, 
    private router: Router
    ) {}

  ngOnInit(): void {
    // Getting all Products from Firebase
    this.productService.getProducts().subscribe((p: any) => {
      this.products = []
      p.forEach((i: any) => {
        let item = i.payload.doc.data() as IProduct
        item.id = i.payload.doc.id
        this.products.push(item)
      })
      this.dataLoading = false
    })
  }

  editProduct(product: any) {
    this.router.navigate([`admin/products/edit-product/${product.id}`])
  }

  deleteProduct(product: any) {

  }

  updateProductStatus(product: any) {

  }

}

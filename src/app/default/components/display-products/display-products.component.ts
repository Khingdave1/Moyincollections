import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-display-products',
  templateUrl: './display-products.component.html',
  styleUrls: ['./display-products.component.scss']
})
export class DisplayProductsComponent implements OnInit {

  products: any
  currentProduct: any
  dataLoading: boolean = true;
  productDetailsModal: boolean = false

  constructor(private productService: ProductService) {} 

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

  // open product details 
  openProductDetails(product: any) {
    this.productDetailsModal = true

    this.currentProduct = product
  }

  // Close product details
  closeProductDetails() {
    this.productDetailsModal = false
  }


  hanldeChange() {
    console.log('Click Outside');
    this.productDetailsModal = false
    
  }
  

}

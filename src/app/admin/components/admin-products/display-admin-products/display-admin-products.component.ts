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
  
  dataLoading: boolean = true;
  products: any;
  currentProduct: any;
  confirmModal: boolean = false;

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

  // Edit product
  editProduct(product: any) {
    this.router.navigate([`admin/products/edit-product/${product.id}`])
  }

  // Open confirm modal
  openConfirmModal(product: any) {
    this.confirmModal = true;

    this.currentProduct = product
  }

  // Close confirm modal
  closeConfirmModal() {
    this.confirmModal = false
  }

}

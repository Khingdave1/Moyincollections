import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
  collectionPath = this.db.collection('products')
  collectionName = 'products'
  
  constructor(private db: AngularFirestore) { }

  // Get all Products
  getProducts() {
    return this.collectionPath.snapshotChanges()
  }

  // Get single product
  getSingleProduct(productId: string) {
    return new Promise<any>((resolve, reject) => {
      this.collectionPath.doc(productId).ref.get().then(res => resolve(res), err => reject(err))
    })
  }

  // Add Product
  addProduct(payload: any) {
    return new Promise<any>((resolve, reject) => {
      this.collectionPath.add(payload).then(res => resolve(res), err => reject(err))
    })
  }

  // Update Product
  updateProduct(productId: string, payload: any) {
    return new Promise<any>((resolve, reject) => {
      this.db.doc(this.collectionName + '/' + productId).update(payload).then(res => resolve(res), err => reject(err))
    })
  }

  // Delete Product
  deleteProduct(productId: string) {
    this.db.doc(this.collectionName + '/' + productId).delete()
  }
}

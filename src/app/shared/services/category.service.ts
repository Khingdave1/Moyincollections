import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  collectionPath = this.db.collection('categories')
  collectionName = 'categories'

  constructor(private db: AngularFirestore) { }

  // Get all categories
  getCategories() {
    return this.collectionPath.snapshotChanges()
  }

  // Add category
  addCategory(payload: any) {
    return new Promise<any>((resolve, reject) => {
      this.collectionPath.add(payload).then(res => resolve(res), err => reject(err))
    })
  }

  // Edit category
  editCategory(categoryId: string, payload: any) {
    return new Promise<any>((resolve, reject) => {
      this.db.doc(this.collectionName + '/' + categoryId).update(payload).then(res => resolve(res), err => reject(err))
    })
  }

  // Delete category
  deleteCategory(categoryId: string) {
    this.db.doc(this.collectionName + '/' + categoryId).delete()
  }
}

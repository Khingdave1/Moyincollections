import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/shared/interfaces/category';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-display-admin-categories',
  templateUrl: './display-admin-categories.component.html',
  styleUrls: ['./display-admin-categories.component.scss']
})
export class DisplayAdminCategoriesComponent {
  dataLoading: boolean = true;
  categories: any;
  currentCategory: any;
  confirmModal: boolean = false;

  constructor(
    private categoryService: CategoryService, 
    private router: Router
    ) {}

  ngOnInit(): void {
    // Getting all Products from Firebase
    this.categoryService.getCategories().subscribe((p: any) => {
      this.categories = []
      p.forEach((i: any) => {
        let item = i.payload.doc.data() as ICategory
        item.id = i.payload.doc.id
        this.categories.push(item)
      })
      this.dataLoading = false
    })
  }

  // Edit category
  editCategory(category: any) {
    this.router.navigate([`admin/categories/edit-category/${category.id}`])
  }

  // Open confirm modal
  openConfirmModal(category: any) {
    this.confirmModal = true;

    this.currentCategory = category
  }

  // Close confirm modal
  closeConfirmModal() {
    this.confirmModal = false
  }

}

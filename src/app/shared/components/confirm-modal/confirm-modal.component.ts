import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {

  @Output() confirmModal: EventEmitter<any> = new EventEmitter();
  @Input() data: any;
  @Input() dataType: any;
  isAlert: boolean = false;
  alertMessage: string;
  alertColor: string;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  // Close modal
  closeConfirmModal() {
    this.confirmModal.emit()
  }

  // Delete Product from firebase
  deleteProduct() {
    this.productService.deleteProduct(this.data.id)

    this.showAlertPopup('Deleted successfully', 'success')

    setTimeout(() => {
      this.closeConfirmModal()
    }, 3000);
  }

  // Delete Category from firebase
  deleteCategory() {
    this.categoryService.deleteCategory(this.data.id)

    this.showAlertPopup('Deleted successfully', 'success')

    setTimeout(() => {
      this.closeConfirmModal()
    }, 3000);
  }

  // Show alert
  showAlertPopup(message: string, color: string) {
    // Set message
    this.alertMessage = message;
    // Set color
    this.alertColor = color;
    // Show Alert
    this.isAlert = true;
    // Hide Alert
    setTimeout(() => {
      this.isAlert = false;
    }, 3000);
  }

}

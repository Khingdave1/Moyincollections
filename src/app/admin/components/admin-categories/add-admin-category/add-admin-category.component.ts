import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-add-admin-category',
  templateUrl: './add-admin-category.component.html',
  styleUrls: ['./add-admin-category.component.scss']
})
export class AddAdminCategoryComponent {
  loading: boolean = false;
  alertMessage: string = '';
  alertColor: string = '';
  isAlert: boolean = false;
  categoryForm: any = FormGroup;
  hide: boolean = true;
  isFormSubmitted: boolean = false;
  categoryPayload: any

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // User form
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
    
  }


  // Save and Close category
  saveAndCloseCategory() {
    this.validateForm()

    this.setProduct()

    // post
    this.categoryService.addCategory(this.categoryPayload).then(res => {
      console.log(res);

      this.showAlert('Category added successfully', 'success')
      // Navigate to Dashboard
      setTimeout(() => {
        // Route user
          this.router.navigate(['/admin/categories'])
      }, 3000);
      
    }).catch(err => {
      console.log(err)
    })
    
  }

  // Save and New category
  saveAndNewCategory() {
    this.validateForm()

    this.setProduct()

    // post
    this.categoryService.addCategory(this.categoryPayload).then(res => {
      console.log(res);

      this.showAlert('Category added successfully', 'success')
      this.categoryForm.reset()
      this.loading = false
      
    }).catch(err => {
      console.log(err)
    })
    
  }

  // Set product payload
  setProduct() {    
    this.categoryPayload = {
      name: this.categoryForm.value.name,
      dateAdded: new Date().toISOString()
    }
  }

  // Validate form
  validateForm() {
    // Start loading
    this.loading = true;

    // Set submitted to true
    this.isFormSubmitted = true;

    // If Form is invalid
    if (this.categoryForm.invalid) {
      this.loading = false;

      return;
    }
  }


  // Show alert
  showAlert(message: string, color: string) {
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

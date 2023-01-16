import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-edit-admin-category',
  templateUrl: './edit-admin-category.component.html',
  styleUrls: ['./edit-admin-category.component.scss']
})
export class EditAdminCategoryComponent {
  loading: boolean = false;
  alertMessage: string = '';
  alertColor: string = '';
  isAlert: boolean = false;
  hide: boolean = true;
  isFormSubmitted: boolean = false;
  currentCategoryId: any;
  category: any

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  // category form
  categoryForm = this.formBuilder.group({
    name: ['', [Validators.required]],
  });
  

  ngOnInit(): void {

    // Get current category id
    this.currentCategoryId = this.activatedRoute.snapshot.params;

    // Get category
    this.getCategory()
  }
  
  async getCategory() {
    await this.categoryService.getSingleCategory(this.currentCategoryId.categoryId).then(res => {
        this.category = res.data()
        
        // category form
        this.categoryForm = this.formBuilder.group({
          name: [this.category.name, [Validators.required]],
        });

      }).catch(err => {
        console.log(err)
      })
  }

  // Update category
  updateCategory() {
    // Start loading
    this.loading = true;

    let paylooad = {
      name: this.categoryForm.value.name,
      dateUpdated: new Date().toISOString()
    }
    
    // post
    this.categoryService.updateCategory(this.currentCategoryId.categoryId, paylooad).then(res => {
      console.log(res);

      this.showAlert('Category updated successfully', 'success')
      // Navigate to Dashboard
      setTimeout(() => {
        // Route user
          this.router.navigate(['/admin/categories'])
      }, 3000);
      
    }).catch(err => {
      console.log(err)
    })    
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

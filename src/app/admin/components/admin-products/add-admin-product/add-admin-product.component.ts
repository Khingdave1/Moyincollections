import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/shared/interfaces/category';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-add-admin-product',
  templateUrl: './add-admin-product.component.html',
  styleUrls: ['./add-admin-product.component.scss']
})
export class AddAdminProductComponent {

  loading: boolean = false;
  alertMessage: string = '';
  alertColor: string = '';
  isAlert: boolean = false;
  productForm: any = FormGroup;
  hide: boolean = true;
  isFormSubmitted: boolean = false;
  selectedFile: any;
  selectedFileName: string;
  file: File;
  isCateg: any;
  isCategList: boolean = false
  categList: any[] = [];
  categories: any;
  productPayload: any

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // Getting all Categories from Firebase
    this.categoryService.getCategories().subscribe((c: any) => {
      this.categories = []
      c.forEach((i: any) => {
        let item = i.payload.doc.data() as ICategory
        item.id = i.payload.doc.id
        this.categories.push(item)
      });
    })

    // User form
    this.productForm = this.formBuilder.group({
      image: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      // status: ['available'],
      // categories: [this.categList],
      price: ['', [Validators.required]],
      // discountedPrice: ['', [Validators.required]],
      totalQuantity: ['', [Validators.required]]
    });
  }


  // Toggle Category
  toggleCateg() {
    this.isCateg = !this.isCateg
  }


  // Add Category
  addCateg(categ: string) {
    // Show added category(s)
    this.isCategList = true;
    // If doesn't exist add new category
    let exist = this.categList.includes(categ);
    if (!exist) {
      this.categList.push({ name: categ});

      this.isCateg = false
      // this.ngOnInit()
    }

  }
  // Remove Category
  removeCateg(index: any) {
    this.categList.splice(index, 1);
    // this.ngOnInit()
  }



  // Save and close product
  saveAndCloseProduct() {
    this.validateForm()

    this.setProduct()

    // post
    this.productService.addProduct(this.productPayload).then(res => {
      console.log(res);

      this.showAlert('Product added successfully', 'success')
      // Navigate to Dashboard
      setTimeout(() => {
        // Route user
          this.router.navigate(['/admin/products'])
      }, 3000);
      
    }).catch(err => {
      console.log(err)
    })
    
    
  }

  // Save and New product
  saveAndNewProduct() {
    this.validateForm()

    this.setProduct()

    // post
    this.productService.addProduct(this.productPayload).then(res => {
      console.log(res);

      this.showAlert('Product added successfully', 'success')
      
      // Reset form
      this.productForm.reset();
      this.selectedFileName = ''
      this.categList = []
      
      // Stop loading
      this.loading = false;
    }).catch(err => {
      console.log(err)
    })
  }

  // Set product payload
  setProduct() {
    this.productPayload = {
      imageUrl: this.selectedFileName,
      name: this.productForm.value.name,
      description: this.productForm.value.description,
      categories: this.categList,
      price: this.productForm.value.price,
      discountedPrice: '',
      totalQuantity: this.productForm.value.totalQuantity,
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
    if (this.productForm.invalid) {
      this.loading = false;

      return;
    }
  }

   // Upload File
   uploadFile(event: any) {
    // for (let index = 0; index < event.length; index++) {
    //   const element = event[index];
    //   this.files.push(element.name)
    // }

    this.file = event.target.files[0];
    // Set file name
    this.selectedFileName = this.file.name;
    // this.ngOnInit()


    // Preview File Selected
    // this.selectedFile = event[0];

    // if (this.selectedFile) {
    //   let reader = new FileReader();
    //   reader.readAsDataURL(this.selectedFile);
    //   // reader.onload = (e: any) => {
    //   //   this.previewImage = e.target.result;
    //   //   if (this.previewImage !== '') {
    //   //     this.showPreviewImage = true;
    //   //   } else {
    //   //     this.showPreviewImage = false;
    //   //   }
    //   // };
    // }
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

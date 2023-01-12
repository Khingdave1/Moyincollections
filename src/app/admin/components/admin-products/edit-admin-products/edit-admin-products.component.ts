import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/shared/interfaces/category';
import { IProduct } from 'src/app/shared/interfaces/product';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-edit-admin-products',
  templateUrl: './edit-admin-products.component.html',
  styleUrls: ['./edit-admin-products.component.scss']
})
export class EditAdminProductsComponent {
  loading: boolean = false;
  alertMessage: string = '';
  alertColor: string = '';
  isAlert: boolean = false;
  hide: boolean = true;
  isFormSubmitted: boolean = false;
  selectedFile: any;
  selectedFileName: string;
  file: File;
  isCateg: any;
  isCategList: boolean = false
  categList: any[] = [];
  categories: any;
  product: any;
  currentProductId: any;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  // Product form
  productForm = this.formBuilder.group({
    imageUrl: ['', [Validators.required]],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    // dateAdded: [''],
    // status: ['available'],
    // categories: [this.categList],
    price: ['', [Validators.required]],
    discountPrice: ['', [Validators.required]],
    // totalQuantity: ['']
  });
  

  ngOnInit(): void {

    // Get current product id
    this.currentProductId = this.activatedRoute.snapshot.params;

    // Get product
    this.getProduct()

    // Getting all Categories from Firebase
    this.categoryService.getCategories().subscribe((c: any) => {
      this.categories = []
      c.forEach((i: any) => {
        let item = i.payload.doc.data() as ICategory
        item.id = i.payload.doc.id
        this.categories.push(item)
      });
    })

    // 
  }
  
  async getProduct() {
    await this.productService.getSingleProduct(this.currentProductId.productId).then(res => {
        this.product = res.data()
        // Product form
        this.productForm = this.formBuilder.group({
          imageUrl: [this.product.imageUrl, [Validators.required]],
          name: [this.product.name, [Validators.required]],
          description: [this.product.description, [Validators.required]],
          // dateAdded: [''],
          // status: ['available'],
          // categories: [this.categList],
          price: [this.product.price, [Validators.required]],
          discountPrice: [this.product.discountPrice, [Validators.required]],
          // totalQuantity: ['']
        });

        // Set category value(s)
        this.isCategList = true
        this.categList = this.product.categories
      }).catch(err => {
        console.log(err)
      })
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
      this.categList.push(categ);

      this.isCateg = false
      // this.ngOnInit()
    }

  }
  // Remove Category
  removeCateg(index: any) {
    this.categList.splice(index, 1);
    // this.ngOnInit()
  }





  // Update product
  updateProduct() {
    this.validateForm()

    let paylooad = {
      imageUrl: this.selectedFileName === undefined ? this.productForm.value.imageUrl : this.selectedFileName,
      name: this.productForm.value.name,
      description: this.productForm.value.description,
      categories: this.categList,
      price: this.productForm.value.price,
      discountPrice: this.productForm.value.discountPrice
    }
    

    // post
    this.productService.updateProduct(this.currentProductId.productId, paylooad).then(res => {
      console.log(res);

      this.showAlert('Product updated successfully', 'success')
      // Navigate to Dashboard
      setTimeout(() => {
        // Route user
          this.router.navigate(['/admin/products'])
      }, 3000);
      
    }).catch(err => {
      console.log(err)
    })
    
    
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

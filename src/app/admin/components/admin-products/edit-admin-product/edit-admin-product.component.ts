import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/shared/interfaces/category';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Storage, ref, uploadBytesResumable, getDownloadURL} from '@angular/fire/storage'

@Component({
  selector: 'app-edit-admin-product',
  templateUrl: './edit-admin-product.component.html',
  styleUrls: ['./edit-admin-product.component.scss']
})
export class EditAdminProductComponent {
  loading: boolean = false;
  alertMessage: string = '';
  alertColor: string = '';
  isAlert: boolean = false;
  hide: boolean = true;
  isFormSubmitted: boolean = false;
  selectedFile: any;
  selectedFileName: string;
  selectedFileUrl: string;
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
    private activatedRoute: ActivatedRoute,
    private storage: Storage
  ) {}

  // Product form
  productForm = this.formBuilder.group({
    imageUrl: ['', [Validators.required]],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required]],
    discountPrice: ['', [Validators.required]],
    totalQuantity: ['', [Validators.required]]
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
          price: [this.product.price, [Validators.required]],
          discountPrice: [this.product.discountPrice, [Validators.required]],
          totalQuantity: [this.product.totalQuantity, [Validators.required]]
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

  // Update product
  updateProduct() {
    // Start loading
    this.loading = true;

    let paylooad = {
      imageUrl: this.selectedFileUrl === undefined ? this.productForm.value.imageUrl : this.selectedFileUrl,
      name: this.productForm.value.name,
      description: this.productForm.value.description,
      categories: this.categList,
      price: this.productForm.value.price,
      discountPrice: this.productForm.value.discountPrice === null ? '' : this.productForm.value.discountPrice,
      totalQuantity: this.productForm.value.totalQuantity,
      dateUpdated: new Date().toISOString()
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

   // Upload File
   uploadFile(event: any) {

    this.file = event.target.files[0];
    // Set file name
    this.selectedFileName = this.file.name;

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(this.storage, `images/${this.selectedFileName}`)
    const uploadTask = uploadBytesResumable(storageRef, this.file)

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done');
        this.showAlert('Image uploaded', 'success')
      },
      (error) => {
        console.log(error.message);
        
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          this.selectedFileUrl = downloadURL
        });
      }
    )
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

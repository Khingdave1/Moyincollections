import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/shared/interfaces/category';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Storage, ref, uploadBytesResumable, getDownloadURL} from '@angular/fire/storage'

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
  selectedFileUrl: string;
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
    private router: Router,
    private storage: Storage
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
      imageUrl: this.selectedFileUrl,
      name: this.productForm.value.name,
      description: this.productForm.value.description,
      categories: this.categList,
      price: this.productForm.value.price,
      discountPrice: 0,
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

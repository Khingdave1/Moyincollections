import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loading: boolean = false;
  alertMessage: string = '';
  isAlert: boolean = false;
  userForm: any = FormGroup;
  hide: boolean = true;
  alertColor: string = '';
  isFormSubmitted: boolean = false;
  isSignedin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // User form
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Login user
  async login() {
    // Start loading
    this.loading = true;

    // Set submitted to true
    this.isFormSubmitted = true;

    // If Form is invalid
    if (this.userForm.invalid) {
      this.loading = false;

      return;
    }

    
    let payload = {
      emailAddress: this.userForm.value.email,
      password: this.userForm.value.password
    }
    
    await this.firebaseService.signinUser(payload)
      .then(res => {
        console.log(res);
        

        if (this.firebaseService.isLogggedIn === true) {
          this.isSignedin = true
          this.showAlert('User logged in successfully', 'success')
          // Navigate to Dashboard
          setTimeout(() => {
            // Route user
              this.router.navigate(['/admin'])
          }, 3000);
        }

      }).catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        this.checkErrorCode(errorCode)
        console.log(error);
        this.loading = false
        
      })
  }

  // Check Error code
  checkErrorCode(errorCode: any) {
    switch (errorCode) {
      // If auth/user-not-found
      case 'auth/user-not-found':
        this.showAlert('User not found', 'error')
        break;
      // If auth/invalid-email
      case 'auth/invalid-email':
        this.showAlert('Invalid email address', 'error')
        break;
      // If auth/wrong-password
      case 'auth/wrong-password':
        this.showAlert('Password is incorrect', 'error')
        break;
      // If auth/too-many-requests
      case 'auth/too-many-requests':
        this.showAlert('Access to this account has been temporarily disabled due to many failed login attempts.', 'error')
        break;
    }
  }

  async signUp() {
    // Start loading
    this.loading = true;

    // Set submitted to true
    this.isFormSubmitted = true;

    // If Form is invalid
    if (this.userForm.invalid) {
      this.loading = false;

      return;
    }

    
    let payload = {
      emailAddress: this.userForm.value.email,
      firstName: "David",
      lastName: "Aremu",
      phoneNumber: "09036577028",
      password: this.userForm.value.password
    }
    console.log(payload);
    
    await this.firebaseService.createUser(payload.emailAddress, payload.password, payload)
      .then(res => {

      }).catch(err => {
        // this.errorMessage = err.message
        // this.loading = false
        console.log(err.message);
        
      })

    // if (this.firebaseService.isLogggedIn === true) {
    //   this.isSignedin = true
    //   // Navigate to Dashboard
    //   this.router.navigate(['/dashboard'])
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

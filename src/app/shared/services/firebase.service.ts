import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  isLogggedIn = false

  // currentUser: string;
  private currentUserSubject: BehaviorSubject<any>
  public currentUser: Observable<any>

  constructor(public firebaseAuth: AngularFireAuth, private authService: AuthService) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('id') || '{}'))
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currenUserValue() {
    return this.currentUserSubject.value
  }

  // Sign In
  async signinUser(payload: any) {
    await this.firebaseAuth.signInWithEmailAndPassword(payload.emailAddress, payload.password)
      .then(res => {
        console.log(res);
        
        this.isLogggedIn = true

        localStorage.setItem('token', JSON.stringify(res.user?.refreshToken))

        localStorage.setItem('id', JSON.stringify(res.user?.uid))

        this.currentUserSubject.next(res.user)
      })
      // .catch(error => {
      //   var errorCode = error.code;
      //   var errorMessage = error.message;
      //   if (errorCode === 'auth/wrong-password') {
      //     console.log('Wrong password.');
      //   } else {
      //     console.log(errorMessage);
      //   }
      //   console.log(error);
        
      // })

  }

  // Sign Up
  async createUser(email: string, password: string, payload: any) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        let data = {
          emailAddress: payload.emailAddress.toLowerCase(),
          firstName: payload.firstName,
          lastName: payload.lastName,
          phoneNumber: payload.phoneNumber,
          uid: res.user?.uid,
        }

        /** sends verification email **/
        // res.user?.sendEmailVerification();

        // Add to profile collection
        this.authService.addUser(data)

        this.isLogggedIn = true

        localStorage.setItem('token', JSON.stringify(res.user?.refreshToken))

        localStorage.setItem('id', JSON.stringify(res.user?.uid))

        this.currentUserSubject.next(res.user)


      })
  }

  // Sign Out
  signout() {
    this.firebaseAuth.signOut()

    // Clear from Local Storage
    localStorage.removeItem('id')
    localStorage.removeItem('token')

    this.currentUserSubject.next(null)

  }
}

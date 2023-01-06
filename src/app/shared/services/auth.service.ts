import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAuth } from '../interfaces/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  firebase: any = environment.firebase;
  userData: any;
  profile: any;

  constructor(private http: HttpClient, private router: Router, private db: AngularFirestore) {}

  // Is logged In
  isLoggedIn() {
    return this.getToken() !== null;
  }

  // Set Token and save to localstorage
  addUserDataToLocalStorage(data: any): void {
    // localStorage.setItem('token', token)
    localStorage.setItem('data', JSON.stringify(data));
  }

  // Set Token to localstorage
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Get Token from localstorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Get Users Data from Local storage
  getUserFromLocalStorage() {
    this.userData = localStorage.getItem('data');
    let data = JSON.parse(this.userData);
    return data;
  }

  // Login user
  loginUser(data: any): Observable<IAuth> {
    return this.http.post<IAuth>(`${this.firebase}auth/login`, data).pipe(
      switchMap((res: any) => {
        console.log(`User Logged In successfully`, res);
        return of(res);
      }),
      catchError((err: any) => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  // // Request Password Reset
  // requestPasswordReset(email: string): Observable<IAuth> {
  //   return this.http
  //     .get<IAuth>(`${this.firebase}auth/request-reset-password?email=${email}`)
  //     .pipe(
  //       switchMap((res: any) => {
  //         console.log(`Code sent successfully`, res);
  //         return of(res);
  //       }),
  //       catchError((err: any) => {
  //         return throwError(() => new Error(err.error.message));
  //       })
  //     );
  // }

  // // Password Reset
  // resetPassword(data: any): Observable<IAuth> {
  //   return this.http
  //     .post<IAuth>(`${this.firebase}auth/reset-password`, data)
  //     .pipe(
  //       switchMap((res: any) => {
  //         console.log(`Password reset successfully`, res);
  //         return of(res);
  //       }),
  //       catchError((err: any) => {
  //         return throwError(() => new Error(err.error.message));
  //       })
  //     );
  // }

  // // Change Password
  // changePassword(data: any): Observable<IAuth> {
  //   return this.http
  //     .post<IAuth>(
  //       `${this.firebase}auth/change-password`,
  //       data,
  //       this.getHttpOptions()
  //     )
  //     .pipe(
  //       switchMap((res: any) => {
  //         console.log(`Password changed successfully`, res);
  //         return of(res);
  //       }),
  //       catchError((err: any) => {
  //         return throwError(() => new Error(err.error.message));
  //       })
  //     );
  // }

  // Log Out
  logOut() {
    // Remove token
    localStorage.removeItem('token');

    // Remove User data
    localStorage.removeItem('data');

    // Route user back to login
    this.router.navigate(['auth/login']);
  }

  // Get HttpOptions
  getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return httpOptions;
  }



  collectionPath = this.db.collection('profile')
  collectionName = 'profile'

  // CREATE
  addUser(payload: any) {
    return new Promise<any>((resolve, reject) => {
      this.db.doc(this.collectionName + '/' + payload.emailAddress).set(payload).then(res => resolve(res), err => reject(err))
    })
  }

  // GET
  // Get all Profiles
  getAllUsers() {
    return this.collectionPath.snapshotChanges()
  }

  // Get single profile
  getSingleUser(userId: string) {
    this.profile = this.db.collection(this.collectionName, ref => ref.where('uid', '==', userId).limit(1))
      .snapshotChanges()
    return this.profile
  }

  // UPDATE
  updateUser(userId: string, payload: any) {
    return new Promise<any>((resolve, reject) => {
      this.db.doc(this.collectionName + '/' + userId).update(payload).then(res => resolve(res), err => reject(err))
    })
  }

  // DELETE
  // deleteUser(userId: string) {
  //   this.db.doc(this.collectionName + '/' + userId).delete()
  // }
}

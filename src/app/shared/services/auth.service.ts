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
  collectionPath = this.db.collection('profile')
  collectionName = 'profile'

  constructor(private http: HttpClient, private router: Router, private db: AngularFirestore) {}

  // Is user authenticated
  public isAutheticated(): boolean {
    const token = localStorage.getItem('token')
    if (token !== null) {
      return true
    } else {
      return false
    }
  }

  // CREATE
  addUser(payload: any) {
    return new Promise<any>((resolve, reject) => {
      this.db.doc(this.collectionName + '/' + payload.emailAddress).set(payload).then(res => resolve(res), err => reject(err))
    })
  }

  // GET

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

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
//Realtime Database.. not cloud firestore
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: any;
  private authState: any;

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router){
    
  }

  get currentUserId(): string{
    return this.authState !== null ? this.authState.user.uid : '';
  }

  login(email:string, password:string){
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((resolve) => {//resolve is a Promise<UserCredential>
        //console.log(resolve.user.uid);
        this.authState = resolve;
        const status = 'online';
        this.setUserStatus(status);
        this.router.navigate(['chat']);
      }).catch(error => alert('Invalid Combination!'));
  }

  signUp(email: string, password:string, displayName:string){
    // this returns a promise, not observable.
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((thing) => {
        //console.log(thing.user.uid);
        this.authState = thing;
        const status = 'online';
        this.setUserData(email, displayName, status);
      }).catch(error => console.log(error));

  }

  logOut(){
    const status = 'offline';
      console.log("called logout");
    //this.setUserStatus(status);
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['login']);//just in case..
      this.setUserStatus(status);

    }).catch(error => alert('Already logged out..'));
  }

  setUserData(email: string, displayName:string, status: string): void{
    // $ sign for string interpolation, doesnt work in ang-cli 8 I guess..
    const path = 'users/'+this.currentUserId;
    const data = {
      email: email,
      displayName: displayName,
      status: status
    };

    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  //Complete Later
  setUserStatus(status: string){
    const path = 'users/'+this.currentUserId;
    const data = {
      status: status
    };
    this.db.object(path).update(data).catch(error => console.log(error));
  }

  getUsersOnline(){
    //use ngIf when calling in html, or we could use equalTo.. ngIf not working with strings ig..
    return this.db.list('users', ref => {
      return ref.orderByChild('status').equalTo('online');
    }).valueChanges();
  }

}

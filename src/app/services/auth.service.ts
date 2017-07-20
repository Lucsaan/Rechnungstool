import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'; 
import { BillService } from './bill.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';


@Injectable()

export class AuthService {

  
  private loggedIn: boolean = false;
  email: string;
  password: string; 
  user: Observable<firebase.User>; 
  uid: string = "";
   

  constructor(public firebaseAuth: AngularFireAuth, private router: Router) {

      this.user = firebaseAuth.authState;
      
   }
  
   login() {
     
      this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(value => {
        console.log('Nice, it worked!');
        this.uid = value.uid;
        this.loggedIn = true;
        this.router.navigate(['/Rechnungsdaten']);
        localStorage.setItem('email', this.email);
        localStorage.setItem('password', this.password);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);

      });
    } 

  isLoggedIn(){
    return this.loggedIn;
  }
  logOut(){
    this.loggedIn = false;
    this.uid = null;
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    
  }

}

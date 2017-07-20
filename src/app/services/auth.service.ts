import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'; 
import { BillService } from './bill.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';


@Injectable()

export class AuthService {

  
  private loggedIn: boolean = true;
  email: string;
  password: string; 
  user: Observable<firebase.User>; 
  uid: string = "8xYFCUfGDZdD19KgwPcIYn5yjqM2"; //Zum Probieren
   

  constructor(public firebaseAuth: AngularFireAuth) {
      this.user = firebaseAuth.authState;
   }

  
  

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(value => {
        console.log('Nice, it worked!');
        this.loggedIn = true;
        
        
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);

      });
  }

  isLoggedIn(){
    return this.loggedIn;
  }

}

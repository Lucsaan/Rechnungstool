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
  


  constructor(public firebaseAuth: AngularFireAuth, public router: Router) {
      this.user = firebaseAuth.authState;
   }

  
  

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(value => {
        console.log('Nice, it worked!');
        this.loggedIn = true;
        this.router.navigate(['/Rechnungsdaten']);
        
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);

      });
  }

  isLoggedIn(){
    return this.loggedIn;
  }

}

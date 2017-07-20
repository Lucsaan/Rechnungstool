import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router : Router) { 
    
  }

  ngOnInit() {
    this.router.navigate(['Login']);
    if(localStorage.getItem('email') !== null && localStorage.getItem('password') !== null){
      this.auth.email = localStorage.getItem('email');
      this.auth.password = localStorage.getItem('password');
      this.auth.login()
    }
  }

}

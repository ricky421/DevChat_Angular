import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  email: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) { }

  Login(){
    const email = this.email;
    const password = this.password;
    this.authService.login(email, password);
  }

}

import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../models/login.interface';
import { UserData } from '../../models/userData.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form = this.fb.group({
    username: [''],
    password: ['']
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  navigateToRegister() {
    this.router.navigate(['auth/register']);
  }

  login() {
    this.authService.login(this.form.value as Login).subscribe({
      next: (res: any) => {
        this.router.navigate(['home']);
        console.log(res)
      },
      error: err => {
        console.error(err);
      }
    });
  }

  prueba()
  {
    this.authService.validateToken();
  }

}

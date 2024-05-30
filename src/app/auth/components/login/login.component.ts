import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  navigateToRegister() {
    this.router.navigate(['auth/register']);
  }

}

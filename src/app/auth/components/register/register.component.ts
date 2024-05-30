import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  form = this.fb.group({
    username: [''],
    pais: [''],
    correo: [''],
    telefono: [''],
    password: ['']
  });

  constructor(private fb: FormBuilder,
              private router: Router
  ) {}

  navigateToLogin() {
    this.router.navigate(['auth/login']);
  }

  navigateToHome() {
    this.router.navigate(['']);
  }


}

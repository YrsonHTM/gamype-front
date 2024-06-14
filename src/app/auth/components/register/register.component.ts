import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaisesService } from '../../../layout/transversal-services/paises.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  form = this.fb.group({
    username: [null, [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    lastname: ['', [Validators.required, Validators.minLength(3)]],
    firstname: ['', [Validators.required, Validators.minLength(3)]],
    cellPhoneNumber: ['', [Validators.required, Validators.minLength(8)]],
    countryCode: [null, Validators.required],
  });

  paises = this.paisesService.getPaises();

  constructor(
              private fb: FormBuilder,
              private router: Router,
              private paisesService: PaisesService,
              private authService: AuthService
  ) {
  }

  registerAcount() {
    this.form.markAllAsTouched();
    if(!this.form.valid) return;

    const register = this.form.value;
    register.countryCode = (this.form.value.countryCode as any).codigo;
    this.authService.registerUser(register).subscribe(
      (response) => {
        console.log(response);
        this.navigateToLogin();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  navigateToLogin() {
    this.router.navigate(['auth/login']);
  }

  navigateToHome() {
    this.router.navigate(['']);
  }


}

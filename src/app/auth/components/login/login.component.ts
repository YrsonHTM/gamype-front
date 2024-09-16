import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../models/login.interface';
import { MessageService } from 'primeng/api';

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
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  navigateToRegister() {
    this.router.navigate(['auth/register']);
  }

  login() {
    this.authService.login(this.form.value as Login).subscribe({
      next: () => {
        this.router.navigate(['gamype']);
      },
      error: () => {
        this.messageService.add({severity:'error', summary:'Error', detail:'Error al iniciar sesión'});
      }
    });
  }

  prueba()
  {
    this.authService.validateToken();
  }

}

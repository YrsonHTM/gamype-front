import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaisesService } from '../../../layout/transversal-services/paises.service';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

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
    idPais: [null, Validators.required],
  });

  paises = this.paisesService.getPaises();

  constructor(
              private fb: FormBuilder,
              private router: Router,
              private paisesService: PaisesService,
              private authService: AuthService,
              private messageService: MessageService
  ) {
  }

  registerAcount() {
    this.form.markAllAsTouched();
    if(!this.form.valid) return;
    const register = this.form.value;
    register.idPais = (this.form.value.idPais as any).id;
    this.authService.registerUser(register).subscribe(
      {
        next: () => {
          this.messageService.add({severity:'success', summary:'Registro exitoso', detail:'Usuario registrado correctamente'});
          this.navigateToLogin();
        },
        error: () => {
          this.messageService.add({severity:'error', summary:'Error', detail:'Error al registrar el usuario'});
        }
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

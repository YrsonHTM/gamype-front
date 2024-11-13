import { Component, OnInit } from '@angular/core';
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
export class RegisterComponent implements OnInit {

  form = this.fb.group({
    username: [null, [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    lastname: ['', [Validators.required, Validators.minLength(3)]],
    firstname: ['', [Validators.required, Validators.minLength(3)]],
    cellPhoneNumber: ['', [Validators.required, Validators.minLength(8)]],
    idPais: ['' as any, Validators.required],
  });

  paises = [];

  filteredPaises = [];

  constructor(
              private fb: FormBuilder,
              private router: Router,
              private paisesService: PaisesService,
              private authService: AuthService,
              private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    if(this.authService.validateToken()){
      this.authService.logOut(this.router, true);
    }
    this.paisesService.getPaises().subscribe(paises => {
      this.paises = paises;
    });
  }

  registerAcount() {
    this.form.markAllAsTouched();
    if(!this.form.valid) return;
    const register = {
      username: this.form.get('username').value,
      password: this.form.get('password').value,
      lastname: this.form.get('lastname').value,
      firstname: this.form.get('firstname').value,
      cellPhoneNumber: this.form.get('cellPhoneNumber').value,
      idPais: this.form.get('idPais').value.id
    };
    this.authService.registerUser(register).subscribe(
      {
        next: () => {
          this.messageService.add({severity:'success', summary:'Registro exitoso', detail:'Usuario registrado correctamente'});
          this.navigateToLogin();
        },
        error: () => {
          this.messageService.add({severity:'error', summary:'Error', detail:'Error al registrar el usuario revise sus datos e intente nuevamente'});
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

  filterElementos($event){
    const query = $event.query;
    this.filteredPaises = this.paises.filter(elemento => elemento.nombre.toLowerCase().includes(query.toLowerCase()));
  }


}

import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-empresa',
  templateUrl: './form-empresa.component.html',
  styleUrl: './form-empresa.component.scss'
})
export class FormEmpresaComponent {
  empresaForm: FormGroup;
  activeIndex: number = 0;
  selectedIcon: string = '';

  iconOptios = [
    'pi-briefcase',
    'pi-building',
    'pi-chart-line',
    'pi-users',
    'pi-sitemap'
  ]
  tamagnioOptions = [
    { label: 'Pequeña', value: 1 },
    { label: 'Mediana', value: 2 },
    { label: 'Grande', value: 3 }
  ];

  tipoOptions = [
    { label: 'Tipo 1', value: 1 },
    { label: 'Tipo 2', value: 2 },
    { label: 'Tipo 3', value: 3 }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.empresaForm = this.fb.group({
      name: ['', Validators.required],
      companyName: ['', Validators.required],
      foundationDate: ['', Validators.required],
      icon: ['', Validators.required],
      idTamagnio: [null, Validators.required],
      idTipoSociedadMercantil: [null, Validators.required],
      idSectorEconomico: [null, Validators.required],
      telefono: ['', [Validators.required, this.maxDigitsValidator(10)]],
      direccion: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      sitioWeb: ['', [Validators.required, this.websiteValidator()]],
    });
  }

  websiteValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
      if (control.value && !pattern.test(control.value)) {
        return { invalidWebsite: true };
      }
      return null;
    };
  }

  maxDigitsValidator(max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value && value.toString().length > max) {
        return { 'maxDigits': { value: value, max: max } };
      }
      return null;
    };
  }

  nextStep() {
    if (this.activeIndex < 1) {
      this.activeIndex++;
    }
  }

  previousStep() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  selectIcon(icon: string) {
    this.empresaForm.get('icon').setValue(icon);
  }


  goBack() {
    this.router.navigate(['gamype']);
  }

  ver() {
    console.log(this.empresaForm
    );
  }

  onSubmit() {
    console.log(this.empresaForm.value);

    if (this.empresaForm.valid) {
      console.log(this.empresaForm.value);
      // Aquí puedes manejar el envío del formulario, por ejemplo, hacer una petición a tu API
    }
  }
}

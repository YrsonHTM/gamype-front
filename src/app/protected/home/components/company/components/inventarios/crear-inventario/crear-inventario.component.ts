import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-crear-inventario',
  templateUrl: './crear-inventario.component.html',
  styleUrl: './crear-inventario.component.scss'
})
export class CrearInventarioComponent implements OnInit {

  editMode: boolean = false;

  form: FormGroup = this.fb.group({
    id: [null],
    nombre: ['', Validators.required],
    direccionFisica: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  ngOnInit(): void {
      if(this.config.data){
      this.editMode = true;
      this.form.patchValue(this.config.data)
    }
  }

  closeDialog(ref) {
    this.form.markAllAsTouched();
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsDirty();
    });
    if(ref){
      if(this.form.invalid)
        return;
    }
      this.ref.close(ref);
  }
}

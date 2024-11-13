import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-crear-rol',
  templateUrl: './crear-rol.component.html',
  styleUrl: './crear-rol.component.scss'
})
export class CrearRolComponent implements OnInit {

  editMode: boolean = false;

  form = this.fb.group({
    nombreCargo: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    id: [null]
  });

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  ngOnInit(): void {
    if(this.config.data){
      this.editMode = true;
      const { id, nombre, descripcion } = this.config.data;
      this.form.patchValue({
        id,
        nombreCargo: nombre,
        descripcion: descripcion})
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

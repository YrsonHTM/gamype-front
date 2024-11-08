import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-form-existencias',
  templateUrl: './form-existencias.component.html',
  styleUrl: './form-existencias.component.scss'
})
export class FormExistenciasComponent implements OnInit {

  addMode: boolean = false;

  form: FormGroup = this.fb.group({
    cantidad: [null],
  });

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) { }

  ngOnInit(): void {
    if(this.config.data.addMode){
      this.addMode = true;
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

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-operaciones-form',
  templateUrl: './operaciones-form.component.html',
  styleUrl: './operaciones-form.component.scss'
})
export class OperacionesFormComponent {
  editMode: boolean = false;

  form = this.fb.group({
    name: ['', [Validators.required]],
    description: [''],
    operationType: [false],
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
      const { id, name, description, operationType } = this.config.data;
      this.form.patchValue({
        id,
        name: name,
        description: description,
        operationType: operationType
      })
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

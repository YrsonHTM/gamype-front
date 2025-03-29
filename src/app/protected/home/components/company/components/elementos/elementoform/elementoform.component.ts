import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ElementoService } from '../elemento.service';

@Component({
  selector: 'app-elementoform',
  templateUrl: './elementoform.component.html',
  styleUrl: './elementoform.component.scss'
})
export class ElementoformComponent implements OnInit {

  editMode: boolean = false;

  form: FormGroup = this.fb.group({
    id: [null],
    nombre: ['', Validators.required],
    codigo: ['', Validators.required],
    descripcion: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private elementoService: ElementoService
  ) { }

  ngOnInit(): void {
      if(this.config.data){
      this.editMode = true;
      this.elementoService.getElemento(this.config.data.id).subscribe(elemento => {
        this.form.patchValue({...elemento, nombre : elemento.name});
      })
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

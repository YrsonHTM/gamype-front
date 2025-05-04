import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ElementoService } from '../../../elementos/elemento.service';
import { Elemento } from '../../../elementos/models/elementos.model';

@Component({
  selector: 'app-form-lotes',
  templateUrl: './form-lotes.component.html',
  styleUrl: './form-lotes.component.scss'
})
export class FormLotesComponent {

  editMode: boolean = false;

  elementos: Elemento[] = [];

  filteredElementos: Elemento[] = [];

  form: FormGroup = this.fb.group({
    id: [null],
    lote: ['', Validators.required],
    idElemento: ['', Validators.required],
    existencias: ['0', Validators.required],
    valorUnitario: ['', Validators.required],
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
      this.form.patchValue(this.config.data)
    }

    this.elementoService.getElementos().subscribe(elementos => {
      this.elementos = elementos;
    })
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

  filterElementos($event){
    const query = $event.query;
    this.filteredElementos = this.elementos.filter(elemento => elemento.codigoAndNombre.toLowerCase().includes(query.toLowerCase()));
  }
}

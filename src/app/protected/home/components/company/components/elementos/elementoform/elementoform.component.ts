import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ElementoService } from '../elemento.service';
import { getUnidad } from '../models/elementos.model';

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
    codigo: ['',],
    unidad: [null],
    descripcion: ['',],
  });

  unidades: getUnidad[] = [];
  filteredUnidad: getUnidad[] = [];

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private elementoService: ElementoService
  ) { }

  ngOnInit(): void {
    this.elementoService.getUnidades().subscribe((data: getUnidad[]) => {
      this.unidades = data;
      this.filteredUnidad = data;
      if(this.config.data){
        this.editMode = true;
        this.elementoService.getElemento(this.config.data.id).subscribe(elemento => {
          this.form.patchValue({...elemento, nombre : elemento.name, unidad: elemento.unidadMedidaTipica});
        })
        this.form.patchValue(this.config.data)
      }
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

  filterUnidad(event) {
    this.filteredUnidad = this.unidades.filter(arl => arl.nombre.toLowerCase().includes(event.query.toLowerCase()));
  }

}

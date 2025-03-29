import { Component, inject, OnInit } from '@angular/core';
import { Elemento } from '../../../elementos/models/elementos.model';
import { FormBuilder, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { getOperation } from '../../../operaciones/models/operacion.model';
import { ElementoService } from '../../../elementos/elemento.service';
import { OperacionesService } from '../../../operaciones/operaciones.service';
import { forkJoin, take } from 'rxjs';
import { ElementoformComponent } from '../../../elementos/elementoform/elementoform.component';
import { MessageService } from 'primeng/api';
import { OperacionesFormComponent } from '../../../operaciones/operaciones-form/operaciones-form.component';

@Component({
  selector: 'app-registrar-compra',
  templateUrl: './registrar-compra.component.html',
  styleUrl: './registrar-compra.component.scss'
})
export class RegistrarCompraComponent implements OnInit {

  fb = inject(FormBuilder);

  ref = inject(DynamicDialogRef);

  elementoService = inject(ElementoService);

  operacionesService = inject(OperacionesService);

  refFormUserAcces = inject(DynamicDialogRef);

  dialogService = inject(DialogService);

  messageService = inject(MessageService);

  elementos: Elemento[] = [];

  filteredElementos: Elemento[] = [];

  operaciones : getOperation[] = [];

  filteredOperaciones: getOperation[] = [];
  
  form = this.fb.group({
    lote: ['', Validators.required],
    idElemento: ['' as string | Elemento, Validators.required],
    valorUnitario: ['', Validators.required],
    operacion: [null, Validators.required],
    concept: [null, Validators.required],
    executionDate: [new Date(), Validators.required],
    movedStock: [0],
  });

  ngOnInit(): void {
    this.cargaData();
    this.valueChanges();
  }

  valueChanges(){
    this.form.get('idElemento').valueChanges.subscribe(() => {
      this.generateLoteName();
    });
  }

  //generar nombre de lote en base al nombre del elemento seleccionado mas la fecha hora
  generateLoteName(){
    const idElemento = this.form.get('idElemento').value as Elemento;
    const date = new Date();
    const loteName = `${idElemento.codigoAndNombre}-${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
    this.form.get('lote').setValue(loteName);
  }

  cargaData(){
    forkJoin([
      this.elementoService.getElementos(),
      this.operacionesService.getOperacionesEmpresa()
    ]).subscribe(([elementos, operaciones]) => {
      this.elementos = elementos;
      this.operaciones = operaciones;
      this.filteredElementos = elementos;
      this.filteredOperaciones = operaciones
    });
  }

  filterElementos($event){
    const query = $event.query;
    this.filteredElementos = this.elementos.filter(elemento => elemento.codigoAndNombre.toLowerCase().includes(query.toLowerCase()));
  }

  filterOperaciones($event){
    const query = $event.query;
    this.filteredOperaciones = this.operaciones.filter(elemento => elemento.name.toLowerCase().includes(query.toLowerCase()));
  }

  closeDialog(ref) {
    this.form.markAllAsTouched();
    console.log(this.form);
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

  addElemento(){
        this.refFormUserAcces = this.dialogService.open(ElementoformComponent, {
          header: 'Crear elemento',
          width: '350px',
          contentStyle: { overflow: 'auto' },
      });
    
      this.refFormUserAcces.onClose.subscribe((data: any) => {
          if (data) {
            this.elementoService.createElemento({
              nombre: data.nombre,
              codigo: data.codigo,
              descripcion: data.descripcion
            }).subscribe({
              next: () => {
                this.messageService.add({severity:'success', summary: 'Elemento creado', detail: 'Elemento creado exitosamente'});
                this.setElementos();
              },
              error: () => {
                this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al crear el elemto'});
              }
            });
        }
      });
  }

  setElementos(){
    this.elementoService.getElementos().subscribe(elementos => {
      this.elementos = elementos;
      this.filteredElementos = elementos;
    });
  }

    crearOperacion(){
      this.refFormUserAcces = this.dialogService.open(OperacionesFormComponent, {
        header: 'Crear Operacion',
        width: '350px',
        contentStyle: { overflow: 'auto' },
    });
  
    this.refFormUserAcces.onClose.subscribe((data: any) => {
        if (data) {
          this.operacionesService.crearOperacions(data).pipe(take(1)).subscribe(
            {
              next: res => {
                if(!res) return;
                this.messageService.add({severity:'success', summary: 'Operacion creada', detail: 'Operacion creada exitosamente'});
                this.loadOperaciones();
              },
              error: () => {
                this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al crear el cargo'});
              }
            }
          );
      }
    });
    }

    loadOperaciones(){
      this.operacionesService.getOperacionesEmpresa().subscribe(operaciones => {
        this.operaciones = operaciones;
        this.filteredOperaciones = operaciones;
      });
    }

}

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
import { EntidadesService } from '../../../entidades/entidades.service';
import { EntidadCreate, GetEntidad, ResponseEntidadModal } from '../../../entidades/models/entidad.model';
import { FormEntidadComponent } from '../../../entidades/form-entidad/form-entidad.component';
import { CompanyService } from '../../../../services/company.service';

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

  entidadesService = inject(EntidadesService);

  companyService = inject(CompanyService);

  elementos: Elemento[] = [];

  filteredElementos: Elemento[] = [];

  operaciones : getOperation[] = [];

  filteredOperaciones: getOperation[] = [];

  entidades: GetEntidad[] = [];

  filteredEntidades: GetEntidad[] = [];
  
  form = this.fb.group({
    lote: ['', Validators.required],
    idElemento: ['' as string | Elemento, Validators.required],
    valorUnitario: ['', Validators.required],
    operacion: [null, Validators.required],
    concept: [null, Validators.required],
    executionDate: [new Date(), Validators.required],
    relatedEntityId: [null],
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
    // recortar codigoandnombre a maximo 8 caracteres 
    const newCodigoAndNombre = idElemento.codigoAndNombre.length > 8 ? idElemento.codigoAndNombre.substring(0, 8) : idElemento.codigoAndNombre;
    const loteName = `${newCodigoAndNombre}-${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
    this.form.get('lote').setValue(loteName);
  }

  cargaData(){
    forkJoin([
      this.elementoService.getElementos(),
      this.operacionesService.getOperacionesEmpresa(),
      this.entidadesService.getEntidades(true)
    ]).subscribe(([elementos, operaciones, entidades]) => {
      this.elementos = elementos;
      this.operaciones = operaciones;
      this.filteredElementos = elementos;
      this.filteredOperaciones = operaciones;
      this.entidades = entidades;
      this.filteredEntidades = entidades;
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

  filterEntidades($event){
    const query = $event.query;
    this.filteredEntidades = this.entidades.filter(elemento => elemento.name.toLowerCase().includes(query.toLowerCase()));
  }

  crearEntidad(relationType: boolean): void {
          this.refFormUserAcces = this.dialogService.open(FormEntidadComponent, {
            header: relationType ? 'Crear provedor' : 'Crear cliente',
            width: '400px',
            contentStyle: { overflow: 'auto' },
        });
      
        this.refFormUserAcces.onClose.subscribe((data: ResponseEntidadModal) => {
            if (data) {
              const paBack: EntidadCreate = {
                name: data.name,
                documentTypeId: data.documentTypeId.id,
                identificationCode: data.identificationCode,
                contactPhone: data.contactPhone,
                email: data.email,
                companyId: this.companyService.getCompanyId(),
                isNaturalPerson: data.isNaturalPerson === 'Persona Natural' ? true : false,
                relationType: relationType,
              }
              this.entidadesService.CreateEntidades(paBack).subscribe({
                next: (data) => {
                  this.messageService.add({severity:'success', summary: 'Exito', detail: 'Registro exitoso'});
                  if(relationType){
                    this.loadEntidades();
                  }
                },
                error: (error) => {
                  this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al registrar'});
                }
              });
          }
        });
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

  loadEntidades(){
    this.entidadesService.getEntidades(true).subscribe(entidades => {
      this.entidades = entidades;
      this.filteredEntidades = entidades;
    }
    );
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

import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OperacionesService } from '../../../operaciones/operaciones.service';
import { getOperation } from '../../../operaciones/models/operacion.model';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EntidadCreate, GetEntidad, ResponseEntidadModal } from '../../../entidades/models/entidad.model';
import { FormEntidadComponent } from '../../../entidades/form-entidad/form-entidad.component';
import { CompanyService } from '../../../../services/company.service';
import { EntidadesService } from '../../../entidades/entidades.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-lote-operacion-form',
  templateUrl: './lote-operacion-form.component.html',
  styleUrl: './lote-operacion-form.component.scss'
})
export class LoteOperacionFormComponent implements OnInit {


  fb = inject(FormBuilder);

  operacionesService = inject(OperacionesService);

  ref = inject(DynamicDialogRef);

  config = inject(DynamicDialogConfig);

  refFormUserAcces = inject(DynamicDialogRef);

  dialogService = inject(DialogService);

  companyService = inject(CompanyService);

  entidadesService = inject(EntidadesService);

  messageService = inject(MessageService);

  operaciones : getOperation[] = [];

  filteredOperaciones: getOperation[] = [];

  filteredEntidades: GetEntidad[] = [];

  entidades: GetEntidad[] = [];

  tipoMovimiento: string[] = ['Entrada', 'Salida'];

  form = this.fb.group({
    operacion: [null, Validators.required],
    concept: [null, Validators.required],
    executionDate: [new Date()],
    tipoMovimineto: ['Salida', Validators.required],
    relatedEntityId: [null],
    movedtStock: [0],
  });

  ngOnInit(): void {
    this.operacionesService.getOperacionesEmpresa().subscribe(operaciones => {
      this.operaciones = operaciones;
      this.filteredOperaciones = operaciones;
    });
    this.loadEntidades();
    this.valueChanges();
  }

  filterOperaciones($event){
    const query = $event.query;
    this.filteredOperaciones = this.operaciones.filter(elemento => elemento.name.toLowerCase().includes(query.toLowerCase()));
  }

    filterEntidades($event){
      const query = $event.query;
      this.filteredEntidades = this.entidades.filter(elemento => elemento.name.toLowerCase().includes(query.toLowerCase()));
    }

    valueChanges(){
      this.form.get('tipoMovimineto').valueChanges.subscribe((value) => {
        this.loadEntidades(value);
      });

      //validar si es salida de elementos que no puedan salir mas de los que hay en stock
      this.form.get('movedtStock').valueChanges.subscribe((value) => {
        if(this.form.value.tipoMovimineto === 'Salida'){
          const stock = this.config.data.existencias;
          if(stock < value){
            this.form.get('movedtStock').setValue(stock);
            this.messageService.add({severity:'error', summary: 'Error', detail: 'No puede salir mas de lo que hay en stock'});
          }
        }
      });
    }
  
    crearEntidad(): void {
            this.refFormUserAcces = this.dialogService.open(FormEntidadComponent, {
              header: this.form.value.tipoMovimineto ? 'Crear provedor' : 'Crear cliente',
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
                  relationType: this.form.value.tipoMovimineto === 'Entrada',
                }
                this.entidadesService.CreateEntidades(paBack).subscribe({
                  next: (data) => {
                    this.messageService.add({severity:'success', summary: 'Exito', detail: 'Registro exitoso'});
                      this.loadEntidades();
                  },
                  error: (error) => {
                    this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al registrar'});
                  }
                });
            }
          });
      }

    loadEntidades(value?: string){
      if(value){
        this.form.get('relatedEntityId').setValue(null);
      }
      const tipoMovimineto = value || this.form.value.tipoMovimineto;
      this.entidadesService.getEntidades(tipoMovimineto === 'Entrada').subscribe(entidades => {
        this.entidades = entidades;
        this.filteredEntidades = entidades;
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

}

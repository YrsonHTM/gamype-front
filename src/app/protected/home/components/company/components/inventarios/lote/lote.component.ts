import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../inventario.service';
import { Inventario } from '../models/inventario.model';
import { ActivatedRoute } from '@angular/router';
import { LayoutCompanyService } from '../../../layout/services/layout-company.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormLotesComponent } from './form-lotes/form-lotes.component';
import { compraLoteResponse, Lote, MovimientoCreate } from './models/lote.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormExistenciasComponent } from './form-existencias/form-existencias.component';
import { LoteOperacionFormComponent } from './lote-operacion-form/lote-operacion-form.component';
import { RegistrarCompraComponent } from './registrar-compra/registrar-compra.component';

@Component({
  selector: 'app-lote',
  templateUrl: './lote.component.html',
  styleUrl: './lote.component.scss'
})
export class LoteComponent implements OnInit {

  inventario: Inventario;

  searchValue = '';

  lotes: Lote[] = [];

  refFormUserAcces: DynamicDialogRef | undefined;


  constructor(
    private inventarioService: InventarioService,
    private route: ActivatedRoute,
    private layoutCompanyService: LayoutCompanyService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    //si en los params esta idInventario lo guarda en el selectedIdinventario
    this.route.queryParams.subscribe(params => {
      if(params['idInventario']){
        this.inventarioService.setSelectIdInventario(+params['idInventario']);
        this.loadLotes();
      }
      else{
        this.inventarioService.setSelectIdInventario(null);
        this.goBack();
      }
    });
  }

  loadLotes(){
    this.inventarioService.getInventario().subscribe({
      next: inventario => {
        this.inventario = inventario;
        this.lotes = inventario.lotes;
      },
      error: () => {
        this.goBack();
      }
    })
  }

  crearLote(){
    this.refFormUserAcces = this.dialogService.open(FormLotesComponent, {
      header: 'Crear lote',
      width: '350px',
      contentStyle: { overflow: 'auto' },
  });

  this.refFormUserAcces.onClose.subscribe((data: Lote) => {
      if (data) {
        const lote = {
          ...data,
          idElemento: data.idElemento.id,
          idInventario: this.inventarioService.getIdInventarioValue()
        };
        this.inventarioService.createOrEditLote(
          lote
        ).subscribe({
          next: () => {
            this.messageService.add({severity:'success', summary: 'Lote creado', detail: 'Lote creado exitosamente'});
            this.loadLotes();
          },
          error: () => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al crear el lote'});
          }
        });
    }
  });
  }

  goBack() {
    this.inventarioService.setSelectIdInventario(null);
    this.layoutCompanyService.goToUlr('/gamype/company/inventarios',null,null,true);
  }

  deactivate() {
    this.inventarioService.setSelectIdInventario(null);
  }

  editarLote(lote: Lote){
    lote.idElemento = lote.elemento;
    this.refFormUserAcces = this.dialogService.open(FormLotesComponent, {
      header: 'Editar lote',
      width: '350px',
      data: lote,
      contentStyle: { overflow: 'auto' },
  });

  this.refFormUserAcces.onClose.subscribe((data: Lote) => {
      if (data) {
        const lote = {
          ...data,
          idElemento: data.idElemento.id,
          idInventario: this.inventarioService.getIdInventarioValue()
        };
        this.inventarioService.createOrEditLote(
          lote
        ).subscribe({
          next: () => {
            this.messageService.add({severity:'success', summary: 'Lote editado', detail: 'Lote editado exitosamente'});
            this.loadLotes();
          },
          error: () => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al editar el lote'});
          }
        });
    }
  });
  }

  eliminarLote(lote: Lote){
    this.confirmationService.confirm({
      message: `Desea eliminar el lote "${lote?.lote}"`,
      header: 'Eliminar lote',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      acceptLabel:"Eliminar",
      rejectLabel:"Cancelar",
      accept: () => {
        this.inventarioService.deleteLote(lote.id).subscribe({
          next: () => {
            this.messageService.add({severity:'success', summary: 'Lote eliminado', detail: 'Lote eliminado exitosamente'});
            this.loadLotes();
          },
          error: () => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al eliminar el lote'});
          }
        });
      }
    });
  }

  agregarExistencias(loteFunc: Lote){
    loteFunc.idElemento = loteFunc.elemento;
    this.refFormUserAcces = this.dialogService.open(FormExistenciasComponent, {
      header: 'Agregar existencias',
      width: '350px',
      data: {
        addMode: true
      },
      contentStyle: { overflow: 'auto' },
  });

  this.refFormUserAcces.onClose.subscribe((data) => {
      if (data) {
        const lote = {
          ...loteFunc,
          idElemento: loteFunc.idElemento.id,
          idInventario: this.inventarioService.getIdInventarioValue(),
          existencias: loteFunc.existencias + data.cantidad
        };
        this.inventarioService.createOrEditLote(
          lote
        ).subscribe({
          next: () => {
            this.messageService.add({severity:'success', summary: 'Existencias agregadas', detail: 'Existencias agregadas exitosamente'});
            this.loadLotes();
          },
          error: () => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al agregar existencias'});
          }
        });
    }
  });
  }

  operacionLote(loteFunc: Lote){
    loteFunc.idElemento = loteFunc.elemento;
    this.refFormUserAcces = this.dialogService.open(LoteOperacionFormComponent, {
      header: 'Ejecutar operación',
      width: '400px',
      data: loteFunc,
      contentStyle: { overflow: 'auto' },
  });

  this.refFormUserAcces.onClose.subscribe((data) => {
      if (data) {
        const operacion : MovimientoCreate = {
          operationTypeId: data.operacion.id,
          concept: data.concept,
          executionDate: this.formatFechaToString(data.executionDate),
          relatedEntityId: data.relatedEntityId.id,
          movements: [
            {
              sourceBatchId: loteFunc.id,
              movedtStock: data.tipoMovimineto === 'Entrada' ? data.movedtStock : -data.movedtStock,
              entryAmount: 0
            }
          ]
        }
        this.inventarioService.extecuteOperacion(operacion).subscribe({
          next: () => {
            this.messageService.add({severity:'success', summary: 'Operación ejecutada', detail: 'Operación ejecutada exitosamente'});
            this.loadLotes();
          },
          error: () => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al ejecutar la operación'});
          }
        });
    }
  });
  }

  formatFechaToString(fecha: Date): string{
    //final format example 2025-03-19T05:00:00.000
    return fecha.toISOString().split('T')[0] + 'T05:00:00.000';
  }

  compraElementos(){
    this.refFormUserAcces = this.dialogService.open(RegistrarCompraComponent, {
      header: 'Compra lote',
      width: '500px',
      contentStyle: { overflow: 'auto' },
  });

  this.refFormUserAcces.onClose.subscribe((data: compraLoteResponse) => {
      if (data) {
        const crearLote : Lote = {
          lote: data.lote,
          idElemento: data.idElemento.id,
          existencias: data.movedStock,
          valorUnitario: data.valorUnitario,
          idInventario: this.inventarioService.getIdInventarioValue(),
          elemento: data.idElemento
        }
        this.inventarioService.createOrEditLote(
          crearLote
        ).subscribe({
          next: (lote: Lote) => {
            const operacion : MovimientoCreate = {
              operationTypeId: data.operacion.id,
              concept: data.concept,
              executionDate: this.formatFechaToString(data.executionDate),
              relatedEntityId: data.relatedEntityId?.id,
              movements: [
                {
                  sourceBatchId: lote.id,
                  movedtStock: data.movedStock,
                  entryAmount: 0
                }
              ]
            }
            this.inventarioService.extecuteOperacion(operacion).subscribe({
              next: () => {
                this.messageService.add({severity:'success', summary: 'Compra registrada', detail: 'Compra registrada exitosamente'});
                this.loadLotes();
              },
              error: () => {
                this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al realizar la compra'});
              }
            });
          },
          error: () => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al crear el lote'});
          }
        });
    }
  });
  }

  extraerExistencias(loteFunc: Lote){
    loteFunc.idElemento = loteFunc.elemento;
    this.refFormUserAcces = this.dialogService.open(FormExistenciasComponent, {
      header: 'Agregar existencias',
      width: '350px',
      data: {
        addMode: false
      },
      contentStyle: { overflow: 'auto' },
  });

  this.refFormUserAcces.onClose.subscribe((data) => {
      if (data) {
        const lote = {
          ...loteFunc,
          idElemento: loteFunc.idElemento.id,
          idInventario: this.inventarioService.getIdInventarioValue(),
          existencias: loteFunc.existencias - data.cantidad
        };
        this.inventarioService.createOrEditLote(
          lote
        ).subscribe({
          next: () => {
            this.messageService.add({severity:'success', summary: 'Existencias agregadas', detail: 'Existencias agregadas exitosamente'});
            this.loadLotes();
          },
          error: () => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al agregar existencias'});
          }
        });
    }
  });
  }

}

import { Component, OnInit } from '@angular/core';
import { getInventario } from './models/inventario.model';
import { InventarioService } from './inventario.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CrearInventarioComponent } from './crear-inventario/crear-inventario.component';
import { LayoutCompanyService } from '../../layout/services/layout-company.service';
import { take } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InventarioHistorialComponent } from './inventario-historial/inventario-historial.component';

@Component({
  selector: 'app-inventarios',
  templateUrl: './inventarios.component.html',
  styleUrl: './inventarios.component.scss'
})
export class InventariosComponent implements OnInit {


  refFormUserAcces: DynamicDialogRef | undefined;
  inventarios: getInventario[] = [];

  searchValue: string = '';

  constructor(
    private inventarioService: InventarioService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private layoutCompanyService: LayoutCompanyService,
    private messageService: MessageService
  ) { }


  ngOnInit(): void {
    this.inventarioService.getSelectIdInventario().pipe(
      take(1)
    ).subscribe(idInventario => {
      if(!idInventario) return;
      this.goLote(idInventario);
    });
    this.inventarioService.getInvetarios().subscribe(inventarios => {
      this.inventarios = inventarios;
    });
  }

  crearInventario(){
    this.refFormUserAcces = this.dialogService.open(CrearInventarioComponent, {
      header: 'Crear Inventario',
      width: '350px',
      contentStyle: { overflow: 'auto' },
  });

  this.refFormUserAcces.onClose.subscribe((data: any) => {
      if (data) {
        this.inventarioService.createInventario({
          nombre: data.nombre,
          direccionFisica: data.direccionFisica
        }).subscribe((res) => {
          if (res) {
            this.inventarioService.getInvetarios().subscribe(inventarios => {
              this.inventarios = inventarios;
            });
          }
        });
    }});

  }

  goInventario(inventario: getInventario){
    this.inventarioService.setSelectIdInventario(inventario.id);
    this.goLote(inventario.id);
  }

  goLote(id){
    this.layoutCompanyService.goToUlr(`/gamype/company/inventarios/lote`,null, {idInventario: id});
  }

  editarElemento(inventario: getInventario){
    this.refFormUserAcces = this.dialogService.open(CrearInventarioComponent, {
      header: 'Editar Inventario',
      width: '350px',
      contentStyle: { overflow: 'auto' },
      data: inventario
    });
    
    this.refFormUserAcces.onClose.subscribe((data: any) => {
      if (data) {
        this.inventarioService.createInventario({
          id: inventario.id,
          nombre: data.nombre,
          direccionFisica: data.direccionFisica
        }).subscribe((res) => {
          if (res) {
            this.inventarioService.getInvetarios().subscribe(inventarios => {
              this.inventarios = inventarios;
            });
          }
        });
    }});
  }

  verHistorial(inventario: getInventario){
    this.refFormUserAcces = this.dialogService.open(InventarioHistorialComponent, {
      header: `Historial de "${inventario?.nombre}"`,
      width: '900px',
      contentStyle: { overflow: 'auto' },
      data: inventario
    });
  }

  eliminarElemento(inventario: getInventario){
    this.confirmationService.confirm({
      message: `Desea eliminar el inventario "${inventario?.nombre}"`,
      header: 'Eliminar inventario',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      acceptLabel:"Eliminar",
      rejectLabel:"Cancelar",

      accept: () => {
        this.inventarioService.deleteInventario(inventario.id).subscribe({
          next: res => {
            this.inventarioService.getInvetarios().subscribe(inventarios => {
              this.inventarios = inventarios;
            });
          },
          error: () => {
            this.layoutCompanyService.goToUlr('/gamype/company/inventarios');
          }
        });
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
  });
  }


}

import { Component, OnInit } from '@angular/core';
import { ElementoService } from './elemento.service';
import { Elemento } from './models/elementos.model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ElementoformComponent } from './elementoform/elementoform.component';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-elementos',
  templateUrl: './elementos.component.html',
  styleUrl: './elementos.component.scss'
})
export class ElementosComponent implements OnInit {

  elementos : Elemento[] = [];

  refFormUserAcces: DynamicDialogRef | undefined;

  searchValue: string = '';


  constructor(
    private elementoService: ElementoService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.setElementos();
  }

  setElementos(){
    this.elementoService.getElementos().subscribe(elementos => {
      this.elementos = elementos;
    });
  }

  crearElemto(){
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
          descripcion: data.descripcion,
          idUnidadMedidaTipica: data?.unidad?.id
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

  eliminarElemento(elemento: Elemento){
    this.confirmationService.confirm({
      message: `Desea eliminar el elemento "${elemento?.codigoAndNombre}"`,
      header: 'Eliminar elemento',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      acceptLabel:"Eliminar",
      rejectLabel:"Cancelar",
      accept: () => {
        this.elementoService.deleteElemento(elemento.id).subscribe({
          next: () => {
            this.messageService.add({severity:'success', summary: 'Elemento eliminado', detail: 'Elemento eliminado exitosamente'});
            this.setElementos();
          },
          error: () => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al eliminar el elemto'});
          }
        });
      }
    });
  }

  editarElemento(elemento: Elemento){
    this.refFormUserAcces = this.dialogService.open(ElementoformComponent, {
      header: 'Editar elemento',
      width: '350px',
      contentStyle: { overflow: 'auto' },
      data: elemento
  });

  this.refFormUserAcces.onClose.subscribe((data: any) => {
    if (data) {
      this.elementoService.createElemento({
        id: data.id,
        nombre: data.nombre,
        codigo: data.codigo,
        descripcion: data.descripcion,
        idUnidadMedidaTipica: data?.unidad?.id
      }).subscribe({
        next: () => {
          this.messageService.add({severity:'success', summary: 'Elemento creado', detail: 'Elemento editado exitosamente'});
          this.setElementos();
        },
        error: () => {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al editar el elemto'});
        }
      });
  }
  }); 

  }

}

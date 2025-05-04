import { Component, OnInit } from '@angular/core';
import { Empleado } from '../personal/models/empleado.model';
import { EmpleadoService } from '../personal/empleado.service';
import { TareasService } from './tareas.service';
import { Tarea, TareaEstado, TareaRequest } from './models/tareas.model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TareaFormComponent } from './tarea-form/tarea-form.component';
import { CompanyService } from '../../services/company.service';
import { forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.scss'
})
export class TareasComponent implements OnInit {
  
  empleados: Empleado[];
  filteredEmpleados: Empleado[];
  selectedEmpleado: Empleado;
  tareas : Tarea[] = [];
  estadosTareas: TareaEstado[] = [];
  refFormUserAcces: DynamicDialogRef | undefined;
  onViewAllCompany: boolean = false;


  constructor(
    	private empleadoService: EmpleadoService,
      private tareasService: TareasService,
      private messageService: MessageService,
      private dialogService: DialogService,
      private companyService: CompanyService,
      private confirmationService: ConfirmationService,
      private activatedRouter: ActivatedRoute,
      private router: Router
  ) { }

  ngOnInit(): void {
    forkJoin([
      this.empleadoService.getEmpleados(),
      this.tareasService.getEstadosTareas()
    ]).subscribe(([empleados, estados]) => {
      this.empleados = empleados;
      this.filteredEmpleados = empleados;
      this.estadosTareas = estados;
          // Obtener los parámetros de la ruta
      this.activatedRouter.queryParams.subscribe(params => {
        const id = Number(params['idEmpleado']);
        if(id){
          this.selectedEmpleado = this.empleados.find(empleado => empleado.id === id);
          this.getTreasByEmpleado();
        }
      });
    });
  }

  selectIdEmpleado(Empleado: Empleado): void {
    if(this.selectedEmpleado && this.selectedEmpleado.id === Empleado.id){
      this.selectedEmpleado = null;
      this.tareas = [];
      this.router.navigate([], { queryParams: { idEmpleado: null }, queryParamsHandling: 'merge' });
      return;
    }
    //selecionar en ruta
    this.onViewAllCompany = false;
    this.router.navigate([], { queryParams: { idEmpleado: Empleado.id }, queryParamsHandling: 'merge' });
    this.selectedEmpleado = Empleado;
    if(this.selectedEmpleado){
      this.getTreasByEmpleado();
    }
  }

  getTreasByEmpleado(): void {
    if(!this.selectedEmpleado){
      this.tareasService.getTareasCompany(this.companyService.getCompanyId()).subscribe(tareas => {
        this.tareas = tareas;
        this.tareas.map(tarea => {
          return tarea.estadoName = this.estadosTareas.find(estado => estado.id === tarea.idStateTask).title;
        });
      });
      return;
    }
    this.tareasService.getTareasByEmpleado(this.selectedEmpleado.id).subscribe((tareas) => {
      this.tareas = tareas;
      this.tareas.map(tarea => {
        return tarea.estadoName = this.estadosTareas.find(estado => estado.id === tarea.idStateTask).title;
      });
    });
  }

  filterEmpleados(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filteredEmpleados = this.empleados.filter(empleado =>
      empleado.nombresApellidos.toLowerCase().includes(query) ||
      (empleado.tipoNroDocumento && empleado.tipoNroDocumento.toLowerCase().includes(query))
    );
  }

  editarTarea(tarea: Tarea): void {
    this.refFormUserAcces = this.dialogService.open(TareaFormComponent, {
      header: 'Editar tarea',
      contentStyle: { overflow: 'auto' },
      data: {
        idEmpleado: this.selectedEmpleado?.id,
        tarea: tarea,
      },
  });
    this.refFormUserAcces.onClose.subscribe((data: any) => {
        if (data) {
          const tareaRequest : TareaRequest = {
            id: tarea.id,
            title: data.titulo,
            description: data.descripcion,
            startDate: data.fechaInicio,
            estimatedEndDate: data.fechaFin,
            idStateTask: data.idElemento.id,
            idCompany: this.companyService.getCompanyId(),
            employeeIds: this.selectedEmpleado?.id ? [this.selectedEmpleado.id].concat(data.involucrados.map((empleado: Empleado) => empleado.id)) : data.involucrados.map((empleado: Empleado) => empleado.id),
          }
          this.tareasService.createOrEditTarea(tareaRequest).subscribe({
            next: () => {
              this.messageService.add({severity:'success', summary: 'Tarea creada', detail: 'La tarea se ha editado correctamente'});
              this.getTreasByEmpleado();
            },
            error: () => {
              this.messageService.add({severity:'error', summary: 'Error', detail: 'Ha ocurrido un error al editar la tarea'});
            }
          });
      }
    });
  }

  eliminarTarea(tarea: Tarea): void {
    this.confirmationService.confirm({
      message: `Desea eliminar la tarea "${tarea?.title}"`,
      header: 'Eliminar tarea',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      acceptLabel:"Eliminar",
      rejectLabel:"Cancelar",
      accept: () => {
        this.tareasService.deleteTarea(tarea.id).subscribe({
          next: () => {
            this.messageService.add({severity:'success', summary: 'Eliminado', detail: 'Eliminado exitosamente'});
            this.getTreasByEmpleado();
          },
          error: () => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al eliminar la tarea'});
          }
        });
      }
    });
  }

  desasignarTarea(tarea){
    this.confirmationService.confirm({
      message: `Desea desasignar la tarea "${tarea?.title}" al empleado "${this.selectedEmpleado?.nombresApellidos}"`,
      header: 'Desasignar tarea',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      acceptLabel:"Desasignar",
      rejectLabel:"Cancelar",
      accept: () => {
        const tareaRequest : TareaRequest = {
          id: tarea.id,
          title: tarea.title,
          description: tarea.description,
          startDate: tarea.startDate,
          estimatedEndDate: tarea.estimatedEndDate,
          idStateTask: tarea.idStateTask,
          idCompany: tarea.idCompany,
          employeeIds: tarea.employees.filter(empleado => empleado.id !== this.selectedEmpleado.id).map(empleado => empleado.id),
        }
        this.tareasService.createOrEditTarea(tareaRequest).subscribe({
          next: () => {
            this.messageService.add({severity:'success', summary: 'Tarea desasignada', detail: 'Tarea desasignada exitosamente'});
            this.getTreasByEmpleado();
          },
          error: () => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al desasignar la tarea'});
          }
        })

      }});
    }

  crearTarea(): void {
        this.refFormUserAcces = this.dialogService.open(TareaFormComponent, {
          header: 'Asignar tarea',
          contentStyle: { overflow: 'auto' },
          data: {
            idEmpleado: this.selectedEmpleado?.id,
          },
      });
        this.refFormUserAcces.onClose.subscribe((data: any) => {
            if (data) {
              const tareaRequest : TareaRequest = {
                title: data.titulo,
                description: data.descripcion,
                startDate: data.fechaInicio,
                estimatedEndDate: data.fechaFin,
                idStateTask: data.idElemento.id,
                idCompany: this.companyService.getCompanyId(),
                employeeIds: [this.selectedEmpleado.id].concat(data.involucrados.map((empleado: Empleado) => empleado.id)),
              }
              this.tareasService.createOrEditTarea(tareaRequest).subscribe({
                next: () => {
                  this.messageService.add({severity:'success', summary: 'Tarea creada', detail: 'La tarea se ha creado correctamente'});
                  this.getTreasByEmpleado();
                },
                error: () => {
                  this.messageService.add({severity:'error', summary: 'Error', detail: 'Ha ocurrido un error al crear la tarea'});
                }
              });
          }
        });
  }

  setOnViewAllCompanyTrue(): void {
    this.onViewAllCompany = !this.onViewAllCompany;
    this.selectedEmpleado = null;
    this.getTreasByEmpleado();
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TareasService } from '../tareas.service';
import { Tarea, TareaEstado } from '../models/tareas.model';
import { EmpleadoService } from '../../personal/empleado.service';
import { Empleado } from '../../personal/models/empleado.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-tarea-form',
  templateUrl: './tarea-form.component.html',
  styleUrl: './tarea-form.component.scss'
})
export class TareaFormComponent implements OnInit {

  form: FormGroup = this.fb.group({
    id: [null],
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
    fechaInicio: ['', Validators.required],
    fechaFin: [''],
    idElemento: [null, Validators.required],
    involucrados: [[]],
  });

  idEmpleado: number;

  estados: TareaEstado[] = [];

  filteredEstados: TareaEstado[] = [];

  editMode: boolean = false;

  empleados: Empleado[] = [];
  

  constructor(
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
    private tareasService: TareasService,
    private empleadoService: EmpleadoService,
    public config: DynamicDialogConfig,
  ){
  }


  ngOnInit(): void {
    this.idEmpleado = this.config.data.idEmpleado;
    if(this.config.data?.tarea as Tarea){
      this.editMode = true;
    }

    forkJoin([
      this.tareasService.getEstadosTareas(),
      this.empleadoService.getEmpleados(),
    ]).subscribe(([estados, empleados]) => {
      this.estados = estados;
      this.filteredEstados = estados;
      this.empleados = empleados;
      //quitar el empleado actuil de la lista
      this.empleados = this.empleados.filter(empleado => empleado.id !== this.idEmpleado);
      if(this.editMode){
        this.form.get('id').setValue(this.config.data.tarea.id);
        this.form.get('titulo').setValue(this.config.data.tarea.title);
        this.form.get('descripcion').setValue(this.config.data.tarea.description);
        this.form.get('fechaInicio').setValue(new Date(this.config.data.tarea.startDate));
        this.form.get('fechaFin').setValue(new Date(this.config.data.tarea.estimatedEndDate));
        this.form.get('idElemento').setValue(this.estados.find(estado => estado.id === this.config.data.tarea.idStateTask));
        this.form.get('involucrados').setValue(this.empleados.filter(empleado => this.config.data.tarea.employees.find(emp => emp.id === empleado.id)));
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

  filterEstados(event) {
    this.filteredEstados = this.estados.filter(estado => estado.title.toLowerCase().includes(event.query.toLowerCase()));
  }

}

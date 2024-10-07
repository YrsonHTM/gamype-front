import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Cargos } from '../../roles/models/cargos.model';
import { RolesService } from '../../roles/roles.service';
import { EmpleadoService } from '../empleado.service';
import { Empleado } from '../models/empleado.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-crear-empleado',
  templateUrl: './crear-empleado.component.html',
  styleUrl: './crear-empleado.component.scss'
})
export class CrearEmpleadoComponent implements OnInit {

  editMode = false;

  cargos : Cargos[] = [];

  filteredCargos: Cargos[] = [];

  tiposContrato = [];

  filteredContrato = [];

  supervisores: Empleado[] = [];

  filteredSupervisores: Empleado[] = [];

  tiposDocumento = [];

  filteredDocumento = [];

  form = this.fb.group({
    id: [null],
    nombres: [null, Validators.required],
    apellidos: [null, Validators.required],
    identificadorEmpresa: [null],
    telefonoLaboral: [null],
    correoElectronicoLaboral: [null, Validators.email],
    direccionVivienda: [null, Validators.required],
    idCargo: [null],
    salario: [null],
    horasSemanales: [null],
    idTipoContrato: [null],
    notas: [null],
    fechaContratacion: [null],
    fechaFinalizacionContratacion: [null],
    motivoFinalizacionContratacion: [null],
    idSupervisor: [null],
    idTipoDocumentoIdentificacion: [null],
    numeroIdentificacion: [null],
  });

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private rolesService: RolesService,
    private empleadoService: EmpleadoService
  ) { }

  ngOnInit(): void {
    if(this.config.data) this.editMode = true;
    this.validadores();
    forkJoin({
      cargos: this.rolesService.getCargosEmpresa(),
      tipoContratos: this.empleadoService.getTipoContrato(),
      empleados: this.empleadoService.getEmpleados(),
      tipoDocumento: this.empleadoService.getTiposDocumentos()
    }).subscribe({
      next: (results) => {
        this.cargos = results.cargos;
        this.filteredCargos = results.cargos;
        this.tiposContrato = results.tipoContratos;
        this.filteredContrato = results.tipoContratos;
        this.supervisores = results.empleados;
        this.filteredSupervisores = results.empleados;
        this.tiposDocumento = results.tipoDocumento;
        this.filteredDocumento = results.tipoDocumento;
        if(this.editMode)
        {
          this.empleadoService.getEmpleado(this.config.data).subscribe({
            next: (empleado) => {
              this.loadInfoEmpleado(empleado);
            }

          });
        }
      },
      error: (error) => {
        console.error('Error loading initial data', error);
      }
    });
  }

  validadores(){
    if(!this.editMode) return;
    this.form.get('idSupervisor').valueChanges.subscribe(value => {
      if(this.form.get('id').value === value?.id){
        this.form.get('idSupervisor').setErrors({notValid: true});
      }
    });
  }

  loadInfoEmpleado(empleado){
      this.form.patchValue({
      id: empleado.id,
      nombres: empleado.nombres,
      apellidos: empleado.apellidos,
      identificadorEmpresa: empleado.identificadorEmpresa,
      telefonoLaboral: empleado.telefonoLaboral,
      correoElectronicoLaboral: empleado.correoElectronicoLaboral,
      direccionVivienda: empleado.direccionVivienda,
      idCargo: empleado.cargo,
      salario: empleado.salario,
      horasSemanales: empleado.horasSemanales,
      idTipoContrato: empleado.tipoContrato,
      notas: empleado.notas,
      fechaContratacion: empleado.fechaContratacion ? new Date(empleado.fechaContratacion) : null,
      fechaFinalizacionContratacion: empleado.fechaFinalizacionContratacion ? new Date(empleado.fechaFinalizacionContratacion) : null,
      motivoFinalizacionContratacion: empleado.motivoFinalizacionContratacion,
      idSupervisor: this.supervisores.find(supervisor => supervisor.id === empleado.supervisor?.id),
      numeroIdentificacion: empleado.numeroIdentificacion,
      idTipoDocumentoIdentificacion: this.tiposDocumento.find(tipo => tipo.id === empleado?.idTipoDocumentoIdentificacion)
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

  filterCargos($event){
    const query = $event.query;
    this.filteredCargos = this.filteredCargos.filter(cargo => cargo.nombre.toLowerCase().includes(query.toLowerCase()));
  }

  filterSupervisores($event){
    const query = $event.query;
    this.filteredSupervisores = this.supervisores.filter(supervisor => supervisor.nombresApellidos.toLowerCase().includes(query.toLowerCase()));
  }

  filterContrato($event){
    const query = $event.query;
    this.filteredContrato = this.tiposContrato.filter(contrato => contrato.nombre.toLowerCase().includes(query.toLowerCase()));
  }

  filterDocumento($event){
    const query = $event.query;
    this.filteredDocumento = this.tiposDocumento.filter(documento => documento.nombre.toLowerCase().includes(query.toLowerCase()));
  }

}

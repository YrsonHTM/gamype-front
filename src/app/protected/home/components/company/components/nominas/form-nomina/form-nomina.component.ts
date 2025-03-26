import { Component, OnInit } from '@angular/core';
import { NominasService } from '../nominas.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Arl, caracteristicasNomina } from '../models/nomina.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmpleadoService } from '../../personal/empleado.service';
import { Empleado } from '../../personal/models/empleado.model';
import { forkJoin } from 'rxjs';
import { ConstantesNomina } from '../../tareas/models/tareas.model';

@Component({
  selector: 'app-form-nomina',
  templateUrl: './form-nomina.component.html',
  styleUrl: './form-nomina.component.scss'
})
export class FormNominaComponent implements OnInit {

  //formulario
  // {
  //   "idEmpleado": 2,
  //   "fechaNomina": "2025-03-01",
  //   "fraccionMes": true,
  //   "salarioMensualQuincenal": 1000000.00,
  //   "comisiones": 200000.00,
  //   "recargoNocturnoOrdinario": 50000.00,
  //   "trabajoExtraSuplementario": 100000.00,
  //   "trabajoDominicalFestivo": 75000.00,
  //   "auxilioTransporte": 200000.00,
  //   "exentoAportesParafiscales": false,
  //   "idNivelRiesgoLaboral": 3,
  //   "idNomina": 1
  // }

  periodos = [
'Primera quincena',
'Segunda quincena'
  ]

  quincenal = false;

  formNomina = this.fb.group({
    id: [''],
    idEmpleado: [''],
    fechaNomina: ['' as any, Validators.required],
    fraccionMes: [false,Validators.required],
    salarioMensualQuincenal: ['',Validators.required],
    comisiones: ['',Validators.required],
    recargoNocturnoOrdinario: ['',Validators.required],
    trabajoExtraSuplementario: ['',Validators.required],
    trabajoDominicalFestivo: ['',Validators.required],
    auxilioTransporte: ['',Validators.required],
    exentoAportesParafiscales: [true,Validators.required],
    idNivelRiesgoLaboral: ['' as any,Validators.required],
    idNomina: [null],
    periodo: [this.periodos[0],Validators.required]
  });

  arl: Arl[] = [];
  empleado: Empleado;
  editMode = false;
  constantesNomina: ConstantesNomina;
  filteredArl: Arl[];

  constructor(
    private nominasService: NominasService,
    private fb: FormBuilder,
    public config: DynamicDialogConfig,
    private empleadoService : EmpleadoService,
    private ref: DynamicDialogRef,
  ) { }

  ngOnInit(): void {
    if(this.config.data?.nomina){
      this.editMode = true;
    }
    forkJoin([
      this.nominasService.getARL(),
      this.empleadoService.getEmpleado(this.config.data.idEmpleado),
      this.nominasService.getConstants()
    ]).subscribe(([arl, empleado, constants]) => {
      this.arl = arl;
      this.filteredArl = arl;
      this.empleado = empleado;
      this.constantesNomina = constants;
      this.formNomina.markAllAsTouched();
      if(!this.editMode){
        console.log(this.constantesNomina.salarioIntegralMinimo * 2 > this.empleado.salario);
        this.formNomina.get('fechaNomina').setValue(new Date());
        this.formNomina.get('idNivelRiesgoLaboral').setValue(this.empleado?.cargo?.nivelesRiesgoARL?.id ||this.arl[0]);
        this.formNomina.get('salarioMensualQuincenal').setValue(this.empleado.salario ? this.empleado.salario.toString() : this.constantesNomina.salarioMinimo.toString());
        this.formNomina.get('auxilioTransporte').setValue(this.constantesNomina.salarioIntegralMinimo * 2 > this.empleado.salario ? this.constantesNomina.auxilioTransporte.toString() : '0');
        this.formNomina.get('comisiones').setValue('0');
        this.formNomina.get('recargoNocturnoOrdinario').setValue('0');
        this.formNomina.get('trabajoExtraSuplementario').setValue('0');
        this.formNomina.get('trabajoDominicalFestivo').setValue('0');
      }
      if(this.editMode){
        this.loadNomina();
      }
    });
  }

  filterArl(event) {
    this.filteredArl = this.arl.filter(arl => arl.nombreClase.toLowerCase().includes(event.query.toLowerCase()));
  }

  loadNomina(){
    this.nominasService.getCaracteristicasNomina(this.config.data.nomina.id).subscribe((nomina: caracteristicasNomina) => {
      if(nomina.fraccionMes){
        const fecha = this.parseDate(nomina.fechaNomina);
        this.formNomina.get('periodo').setValue(this.periodos[fecha.getDate() < 15 ? 0 : 1]);
      }
      this.formNomina.get('auxilioTransporte').setValue(nomina.auxilioTransporte.toString());
      this.formNomina.get('comisiones').setValue(nomina.comisiones.toString());
      this.formNomina.get('exentoAportesParafiscales').setValue(nomina.exentoAportesParafiscales);
      this.formNomina.get('fechaNomina').setValue(this.parseDate(nomina.fechaNomina));
      this.formNomina.get('fraccionMes').setValue(nomina.fraccionMes);
      this.formNomina.get('id').setValue(nomina.id.toString());
      this.formNomina.get('idNivelRiesgoLaboral').setValue(this.arl.find(arl => arl.id === nomina.idNivelRiesgoLaboral));
      this.formNomina.get('idNomina').setValue(nomina.idNomina);
      this.formNomina.get('recargoNocturnoOrdinario').setValue(nomina.recargoNocturnoOrdinario.toString());
      this.formNomina.get('salarioMensualQuincenal').setValue(nomina.salarioMensualQuincenal.toString());
      this.formNomina.get('trabajoExtraSuplementario').setValue(nomina.trabajoExtraSuplementario.toString());
      this.formNomina.get('trabajoDominicalFestivo').setValue(nomina.trabajoDominicalFestivo.toString());
    });
  }

    // Función para convertir una cadena de fecha en formato YYYY-MM-DD a un objeto Date
    parseDate(dateString: string): Date {
      const [year, month, day] = dateString.split('-').map(Number);
      return new Date(year, month - 1, day);
    }

  closeDialog(ref) {
    this.formNomina.markAllAsTouched();
    Object.keys(this.formNomina.controls).forEach(field => {
      const control = this.formNomina.get(field);
      control.markAsDirty();
    });
    if(ref){
      if(this.formNomina.invalid)
        return;
    }
      this.ref.close(ref);
  }

}

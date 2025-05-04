import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { Empleado } from '../personal/models/empleado.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NominasService } from './nominas.service';
import { EmpleadoService } from '../personal/empleado.service';
import { forkJoin } from 'rxjs';
import { Arl, CalculoNomina, Nomina, NominaResumen } from './models/nomina.model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormNominaComponent } from './form-nomina/form-nomina.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ReportePrimaComponent } from './reporte-prima/reporte-prima.component';
import { ReporteCesantiasComponent } from './reporte-cesantias/reporte-cesantias.component';
import { ReporteVacacionesComponent } from './reporte-vacaciones/reporte-vacaciones.component';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-nominas',
  templateUrl: './nominas.component.html',
  styleUrl: './nominas.component.scss'
})
export class NominasComponent implements OnInit {

  filteredEmpleados: Empleado[];

  selectedEmpleado: Empleado;

  empleados: Empleado[] = [];

  nominas: NominaResumen[] = [];

  arl: Arl[] = [];

  refFormUserAcces: DynamicDialogRef | undefined;

  onViewAllCompany: boolean = false;

  informeOptions: any[] | undefined;

  selectInforme = signal<string>('');

  informeEffect = effect(() => {
    if(this.selectInforme() === 'reporte de primas'){
      this.refFormUserAcces = this.dialogService.open(ReportePrimaComponent, {
        header: 'Generar reporte Primna',
        contentStyle: { overflow: 'auto' },
        data: {
          idEmpleado: this.selectedEmpleado?.id,
        },
        width: '300px'
    });
      this.refFormUserAcces.onClose.subscribe((data: any) => {
          const periodo = data.periodo === 'Primer semestre' ? 1 : 2;
          const anio = data.anio.getFullYear();
          if (data) {
            this.nominasService.getResumenPrimas(this.selectedEmpleado.id,anio, periodo).subscribe(
              {
                next: (resumenPrimas: any) => {
                  this.generarInformePrimas(resumenPrimas, this.selectedEmpleado.nombresApellidos, this.selectedEmpleado.nombresApellidos);
                },
                error: (error) => {
                  this.messageService.add({severity:'error', summary: 'Error', detail: error.error});
                }
              }
            );
        }
      });
    }
    if(this.selectInforme() === 'reporte de cesantias'){
      this.refFormUserAcces = this.dialogService.open(ReporteCesantiasComponent, {
        header: 'Generar reporte cesantias',
        contentStyle: { overflow: 'auto' },
        data: {
          idEmpleado: this.selectedEmpleado?.id,
        },
        width: '300px'
    });
      this.refFormUserAcces.onClose.subscribe((data: any) => {
          const anio = data.anio.getFullYear();
          if (data) {
            this.nominasService.getResimenCesantias(this.selectedEmpleado.id,anio).subscribe(
              {
                next: (resumenPrimas: any) => {
                  this.generarInformeCesantias(resumenPrimas, this.selectedEmpleado.nombresApellidos, this.selectedEmpleado.nombresApellidos);
                },
                error: (error) => {
                  this.messageService.add({severity:'error', summary: 'Error', detail: error.error});
                }
              }
            );
        }
      });
    }
    if(this.selectInforme() === 'reporte de vacaciones'){
      this.refFormUserAcces = this.dialogService.open(ReporteVacacionesComponent, {
        header: 'Generar reporte vacaciones',
        contentStyle: { overflow: 'auto' },
        data: {
          idEmpleado: this.selectedEmpleado?.id,
        },
        width: '300px'
    });
      this.refFormUserAcces.onClose.subscribe((data: any) => {
          //formato de fechas de Date a 2025-01-01
          const inicio = data.date1.toISOString().split('T')[0];
          const fin = data.date2.toISOString().split('T')[0];
          if (data) {
            this.nominasService.getResumenVacaciones(this.selectedEmpleado.id,inicio,fin).subscribe(
              {
                next: (resumenPrimas: any) => {
                  this.generarInformeVacaciones(resumenPrimas, this.selectedEmpleado.nombresApellidos, this.selectedEmpleado.nombresApellidos);
                },
                error: (error) => {
                  this.messageService.add({severity:'error', summary: 'Error', detail: error.error});
                }
              }
            );
        }
      });
    }
  });

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private nominasService: NominasService,
    private empleadoService: EmpleadoService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private companyService: CompanyService,
  ) { }

  ngOnInit(): void {
    this.informeOptions = [
      {
          cname: 'reporte de primas',
      },
      {
          cname: 'reporte de cesantias',
      },
      {
          cname: 'reporte de vacaciones',
      }
  ];
        forkJoin([
          this.empleadoService.getEmpleados(),
          this.nominasService.getARL()
        ]).subscribe(([empleados, arl]) => {
          this.empleados = empleados;
          this.filteredEmpleados = empleados;
          this.arl = arl;
              // Obtener los parámetros de la ruta
          this.activatedRouter.queryParams.subscribe(params => {
            const id = Number(params['idEmpleado']);
            if(id){
              this.selectedEmpleado = this.empleados.find(empleado => empleado.id === id);
              this.getNominasByIdEmpleado();
            }
          });
        });
  }


  selectIdEmpleado(Empleado: Empleado): void {
    if(this.selectedEmpleado && this.selectedEmpleado.id === Empleado.id){
      this.selectedEmpleado = null;
      this.nominas = [];
      this.router.navigate([], { queryParams: { idEmpleado: null }, queryParamsHandling: 'merge' });
      return;
    }
    //selecionar en ruta
    this.onViewAllCompany = false;
    this.router.navigate([], { queryParams: { idEmpleado: Empleado.id }, queryParamsHandling: 'merge' });
    this.selectedEmpleado = Empleado;
    if(this.selectedEmpleado){
      this.getNominasByIdEmpleado();
    }
  }

  getNominasByIdEmpleado(){
    this.nominasService.getNominasByIdEmpleado(this.selectedEmpleado.id).subscribe((nominas: NominaResumen[]) => {
      this.nominas = nominas;
    });
  }

  filterEmpleados(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filteredEmpleados = this.empleados.filter(empleado =>
      empleado.nombresApellidos.toLowerCase().includes(query) ||
      (empleado.tipoNroDocumento && empleado.tipoNroDocumento.toLowerCase().includes(query))
    );
  }

  generarNomina(){
        this.refFormUserAcces = this.dialogService.open(FormNominaComponent, {
          header: 'Generar nomina',
          contentStyle: { overflow: 'auto' },
          data: {
            idEmpleado: this.selectedEmpleado?.id,
          },
      });
        this.refFormUserAcces.onClose.subscribe((data: any) => {
            if (data) {
              const calculoNomina: CalculoNomina = {
                ...data,
                idEmpleado: this.selectedEmpleado.id,
                idNivelRiesgoLaboral: data.idNivelRiesgoLaboral.id,
                fechaNomina: this.formatDate(data.fechaNomina, data.fraccionMes, data.periodo),
                idNomina: null,
              };
              this.nominasService.calcularNomina(calculoNomina).subscribe(
                {
                  next: (nomina: NominaResumen) => {
                    this.messageService.add({severity:'success', summary: 'Nomina generada', detail: 'La nomina ha sido generada correctamente'});
                    this.nominasService.getNominasByIdEmpleado(this.selectedEmpleado.id).subscribe((nominas: NominaResumen[]) => {
                      this.nominas = nominas;
                    });
                  },
                  error: (error) => {
                    this.messageService.add({severity:'error', summary: 'Error', detail: error.error});
                  }
                }
              );
          }
        });
  }

  editarNomina(nomina: NominaResumen){
    this.refFormUserAcces = this.dialogService.open(FormNominaComponent, {
      header: 'Ajustar nomina',
      contentStyle: { overflow: 'auto' },
      data: {
        idEmpleado: this.selectedEmpleado?.id,
        nomina: nomina
      },
  });
    this.refFormUserAcces.onClose.subscribe((data: any) => {
        if (data) {
          const calculoNomina: CalculoNomina = {
            ...data,
            idEmpleado: this.selectedEmpleado.id,
            idNivelRiesgoLaboral: data.idNivelRiesgoLaboral.id,
            fechaNomina: this.formatDate(data.fechaNomina, data.fraccionMes, data.periodo),
            idNomina: null,
          };
          this.nominasService.calcularNomina(calculoNomina).subscribe(
            {
              next: (nomina: NominaResumen) => {
                this.messageService.add({severity:'success', summary: 'Nomina generada', detail: 'La nomina ha sido generada correctamente'});
                this.nominasService.getNominasByIdEmpleado(this.selectedEmpleado.id).subscribe((nominas: NominaResumen[]) => {
                  this.nominas = nominas;
                });
              },
              error: (error) => {
                this.messageService.add({severity:'error', summary: 'Error', detail: error.error});
              }
            }
          );
      }
    });
  }

  eliminarNomina(nomina: NominaResumen){
    this.confirmationService.confirm({
      message: `Desea eliminar esta nomina?`,
      header: 'Eliminar nomina',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      acceptLabel:"Eliminar",
      rejectLabel:"Cancelar",
      accept: () => {
        this.nominasService.deleteNomina(nomina.id).subscribe({
          next: () => {
            this.messageService.add({severity:'success', summary: 'Nomina eliminada', detail: 'La nomina ha sido eliminada correctamente'});
            this.nominasService.getNominasByIdEmpleado(this.selectedEmpleado.id).subscribe((nominas: NominaResumen[]) => {
              this.nominas = nominas;
            });
          },
          error: (error) => {
            this.messageService.add({severity:'error', summary: 'Error', detail: error.error});
          }
        });
      }
    });
  }

  firmarNomina(nomina: NominaResumen){
    this.confirmationService.confirm({
      message: `una vez confirmada la nomina no podra editar ni eliminar el registro`,
      header: 'Confirmar nomna',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-success p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",
      acceptLabel:"Confirmar",
      rejectLabel:"Cancelar",
      accept: () => {
        this.nominasService.firmarNomina(nomina.id).subscribe({
          next: () => {
            this.messageService.add({severity:'success', summary: 'Nomina firmada', detail: 'La nomina ha sido confirmada correctamente'});
            this.nominasService.getNominasByIdEmpleado(this.selectedEmpleado.id).subscribe((nominas: NominaResumen[]) => {
              this.nominas = nominas;
            });
          },
          error: (error) => {
            this.messageService.add({severity:'error', summary: 'Error', detail: error.error});
          }
        });
      }
    });
  }

  generarInforme(event){
    this.selectInforme.set(event?.value?.cname);
  }

  setOnViewAllCompanyTrue(){
    this.onViewAllCompany = true;
    this.router.navigate([], { queryParams: { idEmpleado: null }, queryParamsHandling: 'merge' });
    this.selectedEmpleado = null
  }

    // Función para formatear la fecha
    formatDate(date: Date, fraccionMes: boolean, periodo): string {
      if(fraccionMes){
        if(periodo === "Primera quincena"){
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          return `${year}-${month}-01`;
        }
        else{
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          return `${year}-${month}-16`;
        }
      }
      const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          return `${year}-${month}-01`;
    }

    descargarNomina(nominaResumen: NominaResumen){
      this.nominasService.getNominaById(nominaResumen.id).subscribe((nomina: Nomina) => {
        console.log(this.companyService.getCompanyValue());
        this.generarNominaPdf(nomina, nominaResumen);
      });
    }

    generarNominaPdf(nomina: Nomina, nominaResumen: NominaResumen){
      const [year, month, day] = nominaResumen.fechaNomina.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      const fechaAjustada = nominaResumen.fraccionMes ? `${year}-${month}/${day > 15 ? 2 : 1}` : `${year}-${month}`;
      this.nominasService.generatePdfNomina(nomina, 'nomina.pdf', this.selectedEmpleado, fechaAjustada);
    }

    generarInformePrimas(resumenPrimas: any, filename: string, empleado: string,){
      this.nominasService.generatePdfReportePrimas(resumenPrimas, filename, empleado);
    }

    generarInformeCesantias(resumenCesantias: any, filename: string, empleado: string){
      this.nominasService.generatePdfReporteCesantias(resumenCesantias, filename, empleado);
    }

    generarInformeVacaciones(resumenVacaciones: any, filename: string, empleado: string){
      this.nominasService.generatePdfReporteVacaciones(resumenVacaciones, filename, empleado);
    }

}

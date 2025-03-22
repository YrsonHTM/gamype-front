import { Component, OnInit } from '@angular/core';
import { Empleado } from '../personal/models/empleado.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NominasService } from './nominas.service';
import { EmpleadoService } from '../personal/empleado.service';
import { forkJoin } from 'rxjs';
import { Arl, CalculoNomina, Nomina, NominaResumen } from './models/nomina.model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormNominaComponent } from './form-nomina/form-nomina.component';
import { MessageService } from 'primeng/api';

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

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private nominasService: NominasService,
    private empleadoService: EmpleadoService,
    private dialogService: DialogService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
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
        this.generarNominaPdf(nomina, nominaResumen);
      });
    }

    generarNominaPdf(nomina: Nomina, nominaResumen: NominaResumen){
      const [year, month, day] = nominaResumen.fechaNomina.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      const fechaAjustada = nominaResumen.fraccionMes ? `${year}-${month}/${day > 15 ? 2 : 1}` : `${year}-${month}`;
      this.nominasService.generatePdfNomina(nomina, 'nomina.pdf', this.selectedEmpleado.nombresApellidos + (this.selectedEmpleado.tipoNroDocumento ? ' ' + this.selectedEmpleado.tipoNroDocumento : ''), fechaAjustada);
    }

}

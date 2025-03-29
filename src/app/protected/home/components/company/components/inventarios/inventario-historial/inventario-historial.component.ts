import { Component, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from '../../../services/company.service';
import { Empresa } from '../../../models/empresa.model';
import { InventarioService } from '../inventario.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { getInventarioHistorial } from '../models/inventario.model';

@Component({
  selector: 'app-inventario-historial',
  templateUrl: './inventario-historial.component.html',
  styleUrl: './inventario-historial.component.scss'
})
export class InventarioHistorialComponent {
  
  infoEmpresa = signal<Empresa>(null);

  anios = signal<string[]>([]);

  filteredAnios: string[] = [];

  meses = signal<string[]>([]);

  filteredMeses: string[] = [];

  historial : getInventarioHistorial[] = [];

  resumenHistorial: any[] = [];

  basicForm = this.fb.group({
    mes: ['', Validators.required],
    anio: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private inventarioService: InventarioService,
    public config: DynamicDialogConfig,
  ) {

  }

  ngOnInit(): void {
    this.formBasicValidators();
    this.companyService.getCompany().subscribe((company) => {
      this.infoEmpresa.set(company);
    });
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear().toString();

    this.basicForm.patchValue({
      anio: currentYear
    });

    this.anios.set(this.calcularAniosDesdeFecha(this.infoEmpresa().foundationDate));
    this.filteredAnios = this.anios();
  }

  formBasicValidators(): void {
    this.basicForm.get('anio')?.valueChanges.subscribe((anio) => {
      if(!anio) {
        this.basicForm.get('mes')?.setValue('');
        this.basicForm.get('mes')?.disable();
        return;
      }
      this.basicForm.get('mes')?.enable();
      this.meses.set(this.obtenerMeses(anio));
      this.filteredMeses = this.meses();
    });
  }

  calcularAniosDesdeFecha(fecha: string): string[] {
    const fechaInicial = new Date(fecha);
    const fechaActual = new Date();
    const anios = [];
    for (let year = fechaInicial.getFullYear(); year <= fechaActual.getFullYear(); year++) {
      anios.push(year.toString());
    }
    return anios;
  }

  obtenerMeses(anio: string): string[] {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const fechaActual = new Date();
    const currentMonth = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const anioActual = fechaActual.getFullYear().toString();
    this.basicForm.get('mes')?.setValue(meses[Number(currentMonth) - 1]);
    if (anio === anioActual) {
      const mesActual = fechaActual.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
      return meses.slice(0, mesActual);
    }

    return meses;
  }

  filterAnios($event){
    const query = $event.query;
    this.filteredAnios = this.anios().filter(elemento => elemento.toLowerCase().includes(query.toLowerCase()));
  }

  filterMeses($event){
    const query = $event.query;
    this.filteredMeses = this.meses().filter(elemento => elemento.toLowerCase().includes(query.toLowerCase()));
  }

  consultarHistorial(){
    this.inventarioService.getEjecuciones(this.config.data.id).subscribe((historial) => {
      this.historial = historial;
      const allMovements = [];
      this.historial.forEach(element => {
        element.executions.forEach(execution => {
          allMovements.push({
            lote: execution.movements[0].sourceBatch,
            fecha: execution.registrationDate,
            tipo: execution.operationType,
            concepto: execution.concept,
            cantidad: execution.movements[0].movedStock,
            entrada: execution.movements[0].entryAmount,
            salida: execution.movements[0].exitAmount, 
            stockAntes: execution.movements[0].stockBeforeMovement,
            operacion: element.name,
          });
        });
      });
      this.resumenHistorial = allMovements;
      console.log(this.resumenHistorial);
    });
  }
}

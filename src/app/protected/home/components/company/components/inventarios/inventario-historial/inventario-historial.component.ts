import { Component, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from '../../../services/company.service';
import { Empresa } from '../../../models/empresa.model';
import { InventarioService } from '../inventario.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { getInventarioHistorial, GetMovimientos } from '../models/inventario.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-inventario-historial',
  templateUrl: './inventario-historial.component.html',
  styleUrl: './inventario-historial.component.scss'
})
export class InventarioHistorialComponent {
  
  infoEmpresa = signal<Empresa>(null);

  anios = signal<string[]>([]);

  mesesAnio = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  filteredAnios: string[] = [];

  consulted = false;

  meses = signal<string[]>([]);

  filteredMeses: string[] = [];

  historial : GetMovimientos[] = [];

  basicForm = this.fb.group({
    mes: ['', Validators.required],
    anio: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private inventarioService: InventarioService,
    public config: DynamicDialogConfig,
    private messageService: MessageService,
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
    this.inventarioService.getMovimientos(this.config.data.id, this.mesesAnio.indexOf(this.basicForm.get('mes')?.value) + 1, Number(this.basicForm.get('anio')?.value)).subscribe((res) => {
      this.consulted = true;
      this.historial = res;
    });
  }

  descargaExcel(){

    if(this.historial.length === 0){
      this.messageService.add({ severity: 'warn', summary: 'Advertencia', detail: 'No hay datos para exportar' });
      return;
    }
        // Primero mapeamos los datos para darles formato si es necesario
        const dataToExport = this.historial.map(movement => ({
          'Operación': movement.operationName,
          'Descripción Operación': movement.operationDescription,
          'Tipo Operación': movement.operationType ? 'Servicio' : 'Producto',
          'Cantidad Movida': movement.movedStock,
          'Stock Antes': movement.stockBefore,
          'Stock Después': movement.stockAfter,
          'Código Lote': movement.batchCode,
          'Elemento': movement.itemName,
          'Código Elemento': movement.itemCode,
          'Unidad Medida': movement.measurementUnit,
          'Inventario': movement.inventoryName,
          'Concepto': movement.concept,
          'Fecha Ejecución': new Date(movement.executionDate).toLocaleString(),
          'Fecha Registro': new Date(movement.registrationDate).toLocaleString(),
          'Registrado Por': movement.registeredBy,
          'Valor Unitario': movement.unitValue,
          'Nombre Entidad': movement.relatedEntityName,
          'Identificación': movement.relatedEntityIdentification,
          'Teléfono': movement.relatedEntityContactPhone,
          'Email': movement.relatedEntityEmail,
          'Dirección': movement.relatedEntityAddress,
          'Es Persona Natural': movement.relatedEntityIsNaturalPerson ? 'Sí' : 'No',
          'Tipo Relación': movement.relatedEntityRelationType ? 'Provedor' : 'Cliente'
        }));
    
        this.inventarioService.exportToExcel(dataToExport, this.config.data.nombre + ' ' + this.basicForm.get('mes')?.value + ' ' + this.basicForm.get('anio')?.value);
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES'); // Formato español
  }
}

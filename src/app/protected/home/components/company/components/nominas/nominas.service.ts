import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Arl, CalculoNomina, caracteristicasNomina, Nomina, NominaResumen } from './models/nomina.model';
import { ConstantesNomina } from '../tareas/models/tareas.model';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CompanyService } from '../../services/company.service';

@Injectable({
  providedIn: 'root'
})
export class NominasService {

  constructor(
    private http: HttpClient,
    private companyService: CompanyService
  ) { }

  calcularNomina(calcularNomina: CalculoNomina) {
    return this.http.post(`${environment.gamypeApi}fitinv/nomina/calcular`,calcularNomina).pipe(
      catchError(err => {
        return throwError(err);
      })
    );
  }

  getNominasByIdEmpleado(idEmpleado: number): Observable<NominaResumen[]> {
    return this.http.get<NominaResumen[]>(`${environment.gamypeApi}fitinv/nomina/resumen/${idEmpleado}`);
  }

  getARL(): Observable<Arl[]> {
    return this.http.get<Arl[]>(`${environment.gamypeApi}fitinv/nomina/ARL`);
  }

  deleteNomina(idNomina: number) {
    return this.http.delete(`${environment.gamypeApi}fitinv/nomina/${idNomina}`);
  }

  getNominaByIdEmpresa(idEmpresa: number) {
    return this.http.get(`${environment.gamypeApi}fitinv/nomina/resumen-empresa/${idEmpresa}`);
  }

  getResimenCesantias(idEmpleado: number, amio) {
    return this.http.get(`${environment.gamypeApi}fitinv/nomina/resumen-cesantias/${idEmpleado}/${amio}`);
  }

  getResumenPrimas(idEmpleado: number, amio: string, semestre: number) {
    return this.http.get(`${environment.gamypeApi}fitinv/nomina/resumen-primas/${idEmpleado}/${amio}/${semestre}`);
  }

  resumenVacaciones(idEmpleado: number, fechaInicio: string, fechaFin: string) {
    return this.http.get(`${environment.gamypeApi}fitinv/nomina/resumen-vacaciones/${idEmpleado}?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
  }

  getConstants(): Observable<ConstantesNomina> {
    return this.http.get<ConstantesNomina>(`${environment.gamypeApi}fitinv/nomina/constants`);
  }
  
  getCaracteristicasNomina(idNomina: number): Observable<caracteristicasNomina> {
    return this.http.get<caracteristicasNomina>(`${environment.gamypeApi}fitinv/nomina/caracteristicas/${idNomina}`);
  }

  getNominaById(idNomina: number): Observable<Nomina> {
    return this.http.get<Nomina>(`${environment.gamypeApi}fitinv/nomina/${idNomina}`);
  }

  generatePdfNomina(data: Nomina, fileName: string, nombreEmpleado: string, periodoNomina): void {
    const doc = new jsPDF();

    const fecha = new Date();
    const formatFecha = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
    // Función para formatear números como dinero
    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
    };
    // Crear un HTML dinámico con los datos
    const content = `

      <div style="width: 650px; color: black; background-color: white; padding: 25px 80px; font-size: 10px;">
        <div class="left-section" style="color: black; display: flex; align-items: center;">
          <div class="gamype-title" style="color: black; display: flex; align-items: center; gap: 5px;">
            <i class="pi pi-briefcase gl icon" style="color: black;"></i>
            <span class="gl" style="color: black;">GAMYPE</span>
          </div>
        </div>
        <h4 style="color: black; text-align: center; font-size: 14px; margin: 5px 0;">Empresa: "${this.companyService.getCompanValue().companyName}"</h4>
        <h4 style="color: black; text-align: center; font-size: 14px; margin: 5px 0;">Nomina de: "${nombreEmpleado}"</h4>
        <h5 style="color: black; text-align: center; font-size: 10px; margin: 5px 0;">Periodo: "${periodoNomina}"</h5>
        <div style="display: flex; justify-content: space-between; margin: 2px 0;">
          <div><strong>Salario Mensual:</strong></div>
          <div>${formatCurrency(data.salarioMensual)}</div>
        </div>
        <div style="display: flex; justify-content: space-between; margin: 2px 0;">
          <div><strong>Comisiones:</strong></div>
          <div>${formatCurrency(data.comisiones)}</div>
        </div>
        <div style="display: flex; justify-content: space-between; margin: 2px 0;">
          <div><strong>Recargos Nocturnos Ordinarios:</strong></div>
          <div>${formatCurrency(data.recargosNocturnosOrdinarios)}</div>
        </div>
        <div style="display: flex; justify-content: space-between; margin: 2px 0;">
          <div><strong>Trabajo Extra Suplementario:</strong></div>
          <div>${formatCurrency(data.trabajoExtraSuplementario)}</div>
        </div>
        <div style="display: flex; justify-content: space-between; margin: 2px 0;">
          <div><strong>Recargos Dominicales y Festivos:</strong></div>
          <div>${formatCurrency(data.recargosDominicalesFestivos)}</div>
        </div>
        <div style="display: flex; justify-content: space-between; margin: 2px 0;">
          <div><strong>Auxilio de Transporte:</strong></div>
          <div>${formatCurrency(data.auxilioTransporte)}</div>
        </div>
        <div style="background-color: #d3d3d3; display: flex; justify-content: space-between; margin: 2px 0;">
          <div><strong>Total Devengado:</strong></div>
          <div>${formatCurrency(data.totalDevengado)}</div>
        </div>
        <hr style="margin: 5px 0; height: 1px;">
        <div style="display: flex; justify-content: space-between; margin: 2px 0;">
          <div><strong>Prima de Servicios:</strong></div>
          <div>${formatCurrency(data.primaServicios)}</div>
        </div>
        <div style="display: flex; justify-content: space-between; margin: 2px 0;">
          <div><strong>Auxilio de Cesantías:</strong></div>
          <div>${formatCurrency(data.auxilioCesantias)}</div>
        </div>
        <div style="display: flex; justify-content: space-between; margin: 2px 0;">
          <div><strong>Intereses de Cesantías:</strong></div>
          <div>${formatCurrency(data.interesesCesantias)}</div>
        </div>
        <div style="display: flex; justify-content: space-between; margin: 2px 0;">
          <div><strong>Provision de Vacaciones:</strong></div>
          <div>${formatCurrency(data.provisionVacaciones)}</div>
        </div>
        <div style="background-color: #d3d3d3; display: flex; justify-content: space-between; margin: 2px 0;">
          <div><strong>Total Prestaciones Sociales:</strong></div>
          <div>${formatCurrency(data.totalPrestacionesSociales)}</div>
        </div>
        <hr style="margin: 5px 0; height: 1px;">
        <div style="display: flex; justify-content: space-between; margin: 2px 0;">
          <div><strong>SENA:</strong></div>
          <div>${formatCurrency(data.sena)}</div>
        </div>
        <div style="display: flex; justify-content: space-between; margin: 2px 0;">
          <div><strong>ICBF:</strong></div>
          <div>${formatCurrency(data.icbf)}</div>
        </div>
        <div style="display: flex; justify-content: space-between; margin: 2px 0;">
          <div><strong>Cajas de Compensación:</strong></div>
          <div>${formatCurrency(data.cajasCompensacion)}</div>
        </div>
        <div style="background-color: #d3d3d3; display: flex; justify-content: space-between; margin: 2px 0;">
          <div><strong>Total Parafiscales:</strong></div>
          <div>${formatCurrency(data.totalParafiscales)}</div>
        </div>
        <hr style="margin: 5px 0; height: 1px;">
        <div style="display: flex; justify-content: space-between; margin: 2px 0;">
          <div><strong>Aportes Salud Empleador:</strong></div>
          <div>${formatCurrency(data.aportesSaludEmpleador)}</div>
        </div>
        <div style="display: flex; justify-content: space-between; margin: 2px 0;">
          <div><strong>Aportes Pensión Empleador:</strong></div>
          <div>${formatCurrency(data.aportesPensionEmpleador)}</div>
        </div>
        <div style="display: flex; justify-content: space-between; margin: 2px 0;">
          <div><strong>Aportes ARL:</strong></div>
          <div>${formatCurrency(data.aportesArl)}</div>
        </div>
        <div style="background-color: #d3d3d3; display: flex; justify-content: space-between; margin: 2px 0;">
          <div><strong>Total Seguridad Social Empleador:</strong></div>
          <div>${formatCurrency(data.totalSeguridadSocialEmpleador)}</div>
        </div>
        <hr style="margin: 5px 0; height: 1px;">
        <div style="display: flex; justify-content: space-between; margin: 2px 0;">
          <div><strong>Aportes Salud Trabajador:</strong></div>
          <div>${formatCurrency(data.aportesSaludTrabajador)}</div>
        </div>
        <div style="display: flex; justify-content: space-between; margin: 2px 0;">
          <div><strong>Aportes Pensión Trabajador:</strong></div>
          <div>${formatCurrency(data.aportesPensionTrabajador)}</div>
        </div>
        <div style="display: flex; justify-content: space-between; margin: 2px 0;">
          <div><strong>Fondo Solidaridad Pensional:</strong></div>
          <div>${formatCurrency(data.fondoSolidaridadPensional)}</div>
        </div>
        <div style="background-color: #d3d3d3; display: flex; justify-content: space-between; margin: 2px 0;">
          <div><strong>Total Seguridad Social Trabajador:</strong></div>
          <div>${formatCurrency(data.totalSeguridadSocialTrabajador)}</div>
        </div>
        <hr style="margin: 5px 0; height: 1px;">
        <div style="background-color: #d3d3d3; display: flex; justify-content: space-between; margin: 2px 0;">
          <div><strong>Valor Total Cargo Empleador:</strong></div>
          <div>${formatCurrency(data.valorTotalCargoEmpleador)}</div>
        </div>
        <div style="background-color: #d3d3d3; display: flex; justify-content: space-between; margin: 2px 0;">
          <div><strong>Valor Neto a Pagar Trabajador:</strong></div>
          <div>${formatCurrency(data.valorNetoPagarTrabajador)}</div>
        </div>
        <footer style="display: flex; flex-direction: row-reverse; margin-top: 20px">${formatFecha}</footer>
      </div>
    `;

    // Crear un elemento HTML temporal
    const element = document.createElement('div');
    element.innerHTML = content;

    // Ocultar el elemento temporal
    element.style.position = 'fixed'; // Fijar posición
    element.style.top = '-1000px';   // Mover fuera de la pantalla
    document.body.appendChild(element);
    

    html2canvas(element, { scale: 3 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 size in mm
      const pageHeight = 297; // A4 size in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Guardar el PDF
      doc.save(`${nombreEmpleado}.pdf`);

      // Eliminar el elemento temporal
      document.body.removeChild(element);
    });
  }

}

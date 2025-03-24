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

  getResumenVacaciones(idEmpleado: number, fechaInicio: string, fechaFin: string) {
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

  firmarNomina(idNomina: number) {
    return this.http.put(`${environment.gamypeApi}fitinv/nomina/firmar/${idNomina}`, {});
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

  generatePdfReportePrimas(data: {detalles: any[], totalPrimas: number}, fileName: string, nombreEmpleado: string): void {
    const doc = new jsPDF();
  
    const fecha = new Date();
    const formatFecha = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
    
    // Función para formatear números como dinero
    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
    };
  
    // Crear tabla de detalles
    let detallesHTML = '';
    data.detalles.forEach(detalle => {
      detallesHTML += `
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${detalle.fechaNomina}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${formatCurrency(detalle.primaServicios)}</td>
        </tr>
      `;
    });
  
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
        <h4 style="color: black; text-align: center; font-size: 14px; margin: 5px 0;">Reporte de Primas de: "${nombreEmpleado}"</h4>
        
        <h5 style="color: black; text-align: center; font-size: 12px; margin: 15px 0;">Detalle de Primas</h5>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Fecha</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Valor Prima</th>
            </tr>
          </thead>
          <tbody>
            ${detallesHTML}
          </tbody>
        </table>
        
        <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
          <div style="width: 50%;">
            <div style="display: flex; justify-content: space-between; margin: 10px 0; font-weight: bold;">
              <div>Total Primas:</div>
              <div>${formatCurrency(data.totalPrimas)}</div>
            </div>
          </div>
        </div>
        
        <footer style="display: flex; flex-direction: row-reverse; margin-top: 20px">${formatFecha}</footer>
      </div>
    `;
  
    // Crear un elemento HTML temporal
    const element = document.createElement('div');
    element.innerHTML = content;
  
    // Ocultar el elemento temporal
    element.style.position = 'fixed';
    element.style.top = '-1000px';
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
      doc.save(`${fileName || nombreEmpleado}_reporte_primas.pdf`);
  
      // Eliminar el elemento temporal
      document.body.removeChild(element);
    });
  }

  generatePdfReporteCesantias(
    data: {
      detalles: {
        idNomina: number,
        fechaNomina: string,
        auxilioCesantias: number,
        interesesCesantias: number
      }[],
      totalAuxilioCesantias: number,
      totalInteresesCesantias: number,
      totalGeneral: number
    }, 
    fileName: string, 
    nombreEmpleado: string
  ): void {
    try {
      const doc = new jsPDF();
      const formatFecha = this.formatDateToDDMMYYYY(new Date());
      const companyName = this.companyService.getCompanValue().companyName;
  
      // Configuración de estilos
      const styles = {
        header: 'color: black; text-align: center; font-size: 14px; margin: 5px 0;',
        tableHeader: 'border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #f2f2f2;',
        tableCell: 'border: 1px solid #ddd; padding: 8px;',
        rightAlign: 'text-align: right;',
        bold: 'font-weight: bold;',
        footer: 'display: flex; flex-direction: row-reverse; margin-top: 20px;',
        totalRow: 'background-color: #f2f2f2; font-weight: bold;'
      };
  
      // Generar filas de la tabla
      const detallesRows = data.detalles
        .sort((a, b) => new Date(a.fechaNomina).getTime() - new Date(b.fechaNomina).getTime())
        .map(detalle => `
          <tr>
            <td style="${styles.tableCell} text-align: center;">${this.formatDateToDisplay(detalle.fechaNomina)}</td>
            <td style="${styles.tableCell} ${styles.rightAlign}">${this.formatCurrency(detalle.auxilioCesantias)}</td>
            <td style="${styles.tableCell} ${styles.rightAlign}">${this.formatCurrency(detalle.interesesCesantias)}</td>
            <td style="${styles.tableCell} ${styles.rightAlign}">${this.formatCurrency(detalle.auxilioCesantias + detalle.interesesCesantias)}</td>
          </tr>
        `).join('');
  
      // Plantilla HTML
      const content = `
        <div style="width: 650px; color: black; background-color: white; padding: 25px 80px; font-size: 10px;">
          <div style="color: black; display: flex; align-items: center;">
            <div style="color: black; display: flex; align-items: center; gap: 5px;">
              <i class="pi pi-briefcase" style="color: black;"></i>
              <span style="color: black;">GAMYPE</span>
            </div>
          </div>
          
          <h4 style="${styles.header}">Empresa: "${companyName}"</h4>
          <h4 style="${styles.header}">Reporte de Cesantías de: "${nombreEmpleado}"</h4>
          
          <h5 style="${styles.header} font-size: 12px; margin: 15px 0;">Detalle de Cesantías</h5>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr>
                <th style="${styles.tableHeader}">Fecha</th>
                <th style="${styles.tableHeader}">Auxilio Cesantías</th>
                <th style="${styles.tableHeader}">Intereses</th>
                <th style="${styles.tableHeader}">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${detallesRows}
            </tbody>
          </table>
          
          <div style="display: flex; justify-content: flex-end;">
            <div style="width: 60%;">
              <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                <div style="${styles.bold}">Total Auxilio Cesantías:</div>
                <div>${this.formatCurrency(data.totalAuxilioCesantias)}</div>
              </div>
              <div style="display: flex; justify-content: space-between; margin: 5px 0;">
                <div style="${styles.bold}">Total Intereses Cesantías:</div>
                <div>${this.formatCurrency(data.totalInteresesCesantias)}</div>
              </div>
              <div style="display: flex; justify-content: space-between; margin: 10px 0; ${styles.totalRow}">
                <div>Total General:</div>
                <div>${this.formatCurrency(data.totalGeneral)}</div>
              </div>
            </div>
          </div>
          
          <footer style="${styles.footer}">${formatFecha}</footer>
        </div>
      `;
  
      this.generatePdfFromHtml(doc, content, fileName || `${nombreEmpleado}_reporte_cesantias.pdf`);
    } catch (error) {
      console.error('Error al generar el PDF de cesantías:', error);
    }
  }

  // Funciones auxiliares (deberían estar en tu componente o en un servicio de utilidades)
private formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-CO', { 
    style: 'currency', 
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

private formatDateToDDMMYYYY(date: Date): string {
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
}

private formatDateToDisplay(dateString: string): string {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

private generatePdfFromHtml(doc: jsPDF, content: string, fileName: string): void {
  const element = document.createElement('div');
  element.innerHTML = content;
  element.style.position = 'fixed';
  element.style.top = '-1000px';
  document.body.appendChild(element);
  
  html2canvas(element, { 
    scale: 3,
    logging: false,
    useCORS: true
  }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4 width in mm
    const imgHeight = canvas.height * imgWidth / canvas.width;
    
    doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    doc.save(fileName);
    
    document.body.removeChild(element);
  }).catch(error => {
    document.body.removeChild(element);
    throw error;
  });
}

generatePdfReporteVacaciones(
  data: {
    detalles: {
      idNomina: number,
      fechaNomina: string,
      provisionVacaciones: number
    }[],
    totalVacaciones: number
  }, 
  fileName: string, 
  nombreEmpleado: string
): void {
  try {
    const doc = new jsPDF();
    const formatFecha = this.formatDateToDDMMYYYY(new Date());
    const companyName = this.companyService.getCompanValue().companyName;

    // Configuración de estilos
    const styles = {
      header: 'color: black; text-align: center; font-size: 14px; margin: 5px 0;',
      tableHeader: 'border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #f2f2f2;',
      tableCell: 'border: 1px solid #ddd; padding: 8px;',
      rightAlign: 'text-align: right;',
      bold: 'font-weight: bold;',
      footer: 'display: flex; flex-direction: row-reverse; margin-top: 20px;',
      totalRow: 'background-color: #f2f2f2; font-weight: bold;'
    };

    // Generar filas de la tabla
    const detallesRows = data.detalles
      .sort((a, b) => new Date(a.fechaNomina).getTime() - new Date(b.fechaNomina).getTime())
      .map(detalle => `
        <tr>
          <td style="${styles.tableCell} text-align: center;">${this.formatDateToDisplay(detalle.fechaNomina)}</td>
          <td style="${styles.tableCell} ${styles.rightAlign}">${this.formatCurrency(detalle.provisionVacaciones)}</td>
        </tr>
      `).join('');

    // Plantilla HTML
    const content = `
      <div style="width: 650px; color: black; background-color: white; padding: 25px 80px; font-size: 10px;">
        <div style="color: black; display: flex; align-items: center;">
          <div style="color: black; display: flex; align-items: center; gap: 5px;">
            <i class="pi pi-briefcase" style="color: black;"></i>
            <span style="color: black;">GAMYPE</span>
          </div>
        </div>
        
        <h4 style="${styles.header}">Empresa: "${companyName}"</h4>
        <h4 style="${styles.header}">Reporte de Provisiones de Vacaciones de: "${nombreEmpleado}"</h4>
        
        <h5 style="${styles.header} font-size: 12px; margin: 15px 0;">Detalle de Provisiones</h5>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr>
              <th style="${styles.tableHeader}">Fecha</th>
              <th style="${styles.tableHeader}">Provision Vacaciones</th>
            </tr>
          </thead>
          <tbody>
            ${detallesRows}
          </tbody>
        </table>
        
        <div style="display: flex; justify-content: flex-end;">
          <div style="width: 50%;">
            <div style="display: flex; justify-content: space-between; margin: 10px 0; ${styles.totalRow}">
              <div>Total Provisiones:</div>
              <div>${this.formatCurrency(data.totalVacaciones)}</div>
            </div>
          </div>
        </div>
        
        <footer style="${styles.footer}">${formatFecha}</footer>
      </div>
    `;

    this.generatePdfFromHtml(doc, content, fileName || `${nombreEmpleado}_reporte_vacaciones.pdf`);
  } catch (error) {
    console.error('Error al generar el PDF de vacaciones:', error);
  }
}

}

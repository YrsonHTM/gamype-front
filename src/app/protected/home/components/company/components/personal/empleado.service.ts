import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { Empleado } from './models/empleado.model';
import { CompanyService } from '../../services/company.service';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(
    private http: HttpClient,
    private companyService: CompanyService
  ) { }

  crearEmpleado(empleado: Empleado){
    return this.http.post(`${environment.gamypeApi}fitinv/empleados/${this.companyService.getCompanyId()}`, empleado);
  }

  getEmpleados(){
    return this.http.get<Empleado[]>(`${environment.gamypeApi}fitinv/empleados/empresa/${this.companyService.getCompanyId()}`);
  }

  getTipoContrato(): Observable<any[]>{
    return this.http.get<any[]>(`${environment.gamypeApi}fitinv/empleados/tiposContrato`).pipe(
      catchError(err => {
        return of([]);
      })
    );
  }

  getEmpleado(id: number){
    return this.http.get<Empleado>(`${environment.gamypeApi}fitinv/empleados/${id}`);
  }

  deleteEmpleado(id: number){
    return this.http.delete(`${environment.gamypeApi}fitinv/empleados/${id}`);
  }

  getTiposDocumentos(){
    return this.http.get<any[]>(`${environment.gamypeApi}fitinv/empleados/tiposIdentificacion`).pipe(
      catchError(err => {
        return of([]);
      }));
  }

}

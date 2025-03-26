import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../../environments/environment';
import { CompanyService } from '../../services/company.service';
import { getOperation, operationCreate, operationCreateResponse } from './models/operacion.model';

@Injectable({
  providedIn: 'root'
})
export class OperacionesService {

  constructor(
    private http: HttpClient,
    private companyService: CompanyService
  ) { }

  crearOperacions(operation: operationCreate): Observable<operationCreateResponse[]> {
    return this.http.post<operationCreateResponse[]>(`${environment.gamypeApi}fitinv/operation/${this.companyService.getCompanyId()}`,operation);
  }

  getOperacionesEmpresa(): Observable<getOperation[]> {
    return this.http.get<getOperation[]>(`${environment.gamypeApi}fitinv/operation/${this.companyService.getCompanyId()}`);
  }

  eliminarOperacion(id: number){
    return this.http.delete(`${environment.gamypeApi}fitinv/operation/${id}`);
  }

}

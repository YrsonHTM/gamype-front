import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Elemento } from './models/elementos.model';
import { environment } from '../../../../../../../environments/environment';
import { CompanyService } from '../../services/company.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElementoService {

  constructor(
    private http: HttpClient,
    private companyService: CompanyService
  ) { }

  getInvetarios() {
    return this.http.get(`${environment.gamypeApi}fitinv/inventory/${this.companyService.getCompanyId()}`);
  }

  // /create/elemento/{idEmpresa}
  createElemento(elemento: Elemento) {
    return this.http.post(`${environment.gamypeApi}fitinv/inventory/create/item/${this.companyService.getCompanyId()}`, elemento);
  }

  getElementos(): Observable<Elemento[]> {
    return this.http.get<Elemento[]>(`${environment.gamypeApi}fitinv/inventory/elementos/${this.companyService.getCompanyId()}?query=`);
  }

  getElemento(id: number): Observable<Elemento> {
    return this.http.get<Elemento>(`${environment.gamypeApi}fitinv/inventory/item/${id}`);
  }

  deleteElemento(id: number) {
    return this.http.delete(`${environment.gamypeApi}fitinv/inventory/item/${id}`);
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { Sectores } from '../components/form-empresa/models/sectores.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(
    private http: HttpClient
  ) { }

  getSectoresMercantiles():Observable<Sectores> {
    return this.http.get<Sectores>(`${environment.gamypeApi}/fitinv/enterprise/sectoresMercantiles`);
  }

  getTamagnios(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.gamypeApi}/fitinv/enterprise/tamagnio`);
  }

  getSociedadesMercantiles(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.gamypeApi}/fitinv/enterprise/sociedadesMercantiles`);
  }

  guuardarEmpresa(data: any): Observable<any> {
    return this.http.post<any>(`${environment.gamypeApi}/fitinv/enterprise/create`, data);
  }

  getEmpresas(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.gamypeApi}/fitinv/enterprise`);
  }

  getRolesAplication(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.gamypeApi}/fitinv/enterprise/rolesEmpresa`);
  }

  deleteCompany(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.gamypeApi}/fitinv/enterprise/delete/${id}`);
  }

}

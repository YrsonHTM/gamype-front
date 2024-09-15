import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { Sectores } from '../components/form-empresa/models/sectores.interface';
import { UsersEmpresa } from './utils/users-empresa.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(
    private http: HttpClient
  ) { }

  getSectoresMercantiles():Observable<Sectores> {
    return this.http.get<Sectores>(`${environment.gamypeApi}fitinv/enterprise/sectoresMercantiles`);
  }

  getTamagnios(): Observable<any> {
    return this.http.get<any>(`${environment.gamypeApi}fitinv/enterprise/tamagnio`);
  }

  getSociedadesMercantiles(): Observable<any> {
    return this.http.get<any>(`${environment.gamypeApi}fitinv/enterprise/sociedadesMercantiles`);
  }

  guuardarEmpresa(data: any): Observable<any> {
    return this.http.post<any>(`${environment.gamypeApi}fitinv/enterprise/create`, data);
  }

  getUsersByCompany(id: number): Observable<UsersEmpresa[]> {
    return this.http.get<UsersEmpresa[]>(`${environment.gamypeApi}fitinv/enterprise/users/${id}`);
  }

  getEmpresas(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.gamypeApi}fitinv/enterprise`);
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.post<any[]>(`${environment.gamypeApi}fitinv/user/user`,email);
  }

  getRolesAplication(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.gamypeApi}fitinv/enterprise/rolesEmpresa`);
  }

  deleteCompany(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.gamypeApi}fitinv/enterprise/delete/${id}`);
  }

  getInfoEmpresa(id: number): Observable<any> {
    return this.http.get<any>(`${environment.gamypeApi}fitinv/enterprise/get/${id}`);
  }

  editarEmpresa(data: any, id: number): Observable<any> {
    return this.http.post<any>(`${environment.gamypeApi}fitinv/enterprise/create/${id}`, data);
  }

  asignarRolEmpresa(data: any): Observable<any> {
    return this.http.post<any>(`${environment.gamypeApi}fitinv/enterprise/asignarRol`, data);
  }

}

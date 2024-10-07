import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Sectores, Tamagnio } from '../components/form-empresa/models/sectores.interface';
import { UsersEmpresa } from './utils/users-empresa.interface';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private rolesAplicacion: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  getSectoresMercantiles():Observable<Sectores> {
    return this.http.get<Sectores>(`${environment.gamypeApi}fitinv/enterprise/sectoresMercantiles`);
  }

  getTamagnios(): Observable<Tamagnio> {
    return this.http.get<Tamagnio>(`${environment.gamypeApi}fitinv/enterprise/tamagnio`);
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
    return this.http.get<any[]>(`${environment.gamypeApi}fitinv/enterprise`).pipe();
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.post<any[]>(`${environment.gamypeApi}fitinv/user/user`,email);
  }

  getRolesAplication(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.gamypeApi}fitinv/enterprise/rolesEmpresa`).pipe(
      tap(roles => this.rolesAplicacion.next(roles))
    );
  }

  getRolesAplicationValue() {
    return this.rolesAplicacion.value;
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

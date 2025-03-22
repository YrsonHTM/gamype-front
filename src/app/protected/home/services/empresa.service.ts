import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Sectores, Tamagnio } from '../components/form-empresa/models/sectores.interface';
import { CreateEmpresa, GeneralSociedadesMercantiles, GetEmpresas, GetUserByEmail, InfoEmpresa, Master, UsersEmpresa } from './utils/users-empresa.interface';
import { RolesTypes } from './utils/roles-types';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private rolesAplicacion: BehaviorSubject<RolesTypes[]> = new BehaviorSubject<RolesTypes[]>([]);

  constructor(
    private http: HttpClient
  ) { }

  getSectoresMercantiles():Observable<Sectores> {
    return this.http.get<Sectores>(`${environment.gamypeApi}fitinv/enterprise/sectoresMercantiles`);
  }

  getTamagnios(): Observable<Tamagnio> {
    return this.http.get<Tamagnio>(`${environment.gamypeApi}fitinv/enterprise/tamagnio`);
  }

  getSociedadesMercantiles(): Observable<GeneralSociedadesMercantiles> {
    return this.http.get<GeneralSociedadesMercantiles>(`${environment.gamypeApi}fitinv/enterprise/sociedadesMercantiles`);
  }

  guuardarEmpresa(data: any): Observable<CreateEmpresa> {
    return this.http.post<CreateEmpresa>(`${environment.gamypeApi}fitinv/enterprise/create`, data);
  }

  getUsersByCompany(id: number): Observable<UsersEmpresa[]> {
    return this.http.get<UsersEmpresa[]>(`${environment.gamypeApi}fitinv/enterprise/users/${id}`);
  }

  getEmpresas(): Observable<GetEmpresas[]> {
    return this.http.get<GetEmpresas[]>(`${environment.gamypeApi}fitinv/enterprise`).pipe();
  }

  getUserByEmail(email: string): Observable<GetUserByEmail[]> {
    return this.http.post<GetUserByEmail[]>(`${environment.gamypeApi}fitinv/user/user`,email);
  }

  getRolesAplication(): Observable<RolesTypes[]> {
    return this.http.get<RolesTypes[]>(`${environment.gamypeApi}fitinv/enterprise/rolesEmpresa`).pipe(
      tap(roles => this.rolesAplicacion.next(roles))
    );
  }

  masterSearch(): Observable<Master[]> {
    return this.http.get<any[]>(`${environment.gamypeApi}fitinv/enterprise/master/search`);
  }

  getRolesAplicationValue() {
    return this.rolesAplicacion.value;
  }

  deleteCompany(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.gamypeApi}fitinv/enterprise/delete/${id}`);
  }

  getInfoEmpresa(id: number): Observable<InfoEmpresa> {
    return this.http.get<InfoEmpresa>(`${environment.gamypeApi}fitinv/enterprise/get/${id}`);
  }

  editarEmpresa(data: any, id: number): Observable<CreateEmpresa> {
    return this.http.post<CreateEmpresa>(`${environment.gamypeApi}fitinv/enterprise/create/${id}`, data);
  }

  asignarRolEmpresa(data: any): Observable<string[]> {
    return this.http.post<string[]>(`${environment.gamypeApi}fitinv/enterprise/asignarRol`, data);
  }

}

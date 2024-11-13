import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Empresa } from '../models/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private company: BehaviorSubject<Empresa> = new BehaviorSubject<Empresa>(null)
  private rolesEmpresa: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([])
  private rolesAplicacion: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([])

  constructor() { }

  setCompany(company){
    this.company.next(company);
  }

  setRolesAplicacion(roles){
    this.rolesAplicacion.next(roles);
  }

  getRolesAplicacion(){
    return this.rolesAplicacion.asObservable();
  }

  getRolesAplicacionValue(){
    return this.rolesAplicacion.value
  }

  setRolesEmpresa(roles){
    if(!roles) return;
    this.rolesEmpresa.next(roles);
  }

  getRolesEmpresa(){
    return this.rolesEmpresa.asObservable();
  }

  getRolesEmpresaValue(){
    return this.rolesEmpresa.value
  }

  getCompany(){
    return this.company.asObservable();
  }

  getCompanyId(){
    return this.company.value.id;
  }

  getCompanValue(){
    return this.company.value
  }

}

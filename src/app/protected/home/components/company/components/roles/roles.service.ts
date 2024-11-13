import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { CompanyService } from '../../services/company.service';
import { Cargos } from './models/cargos.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(
    private http: HttpClient,
    private companyService: CompanyService
  ) { }

  getCargosEmpresa(): Observable<Cargos[]> {
    return this.http.get<Cargos[]>(`${environment.gamypeApi}fitinv/cargos/${this.companyService.getCompanyId()}`);
  }

  crearCargo(cargo){
    return this.http.post(`${environment.gamypeApi}fitinv/cargos/${this.companyService.getCompanyId()}`, cargo);
  }

  eliminarCargo(id){
    return this.http.delete(`${environment.gamypeApi}fitinv/cargos/${id}`);
  }

}

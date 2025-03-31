import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { EntidadCreate, GetEntidad } from './models/entidad.model';
import { CompanyService } from '../../services/company.service';

@Injectable({
  providedIn: 'root'
})
export class EntidadesService {

  constructor(
    private http: HttpClient,
    private companyService: CompanyService
  ) { }

  CreateEntidades(entidadCreate: EntidadCreate) {
    return this.http.post(`${environment.gamypeApi}fitinv/relatedEntity`,entidadCreate);
  }

  getEntidades( relationType: boolean) {
    return this.http.get<GetEntidad[]>(`${environment.gamypeApi}fitinv/relatedEntity/company/${this.companyService.getCompanyId()}?relationType=${relationType}`);
  }

  getEntidadById(id: number) {
    return this.http.get(`${environment.gamypeApi}fitinv/relatedEntity/${id}`);
  }

  deleteEntidad(id: number) {
    return this.http.delete(`${environment.gamypeApi}fitinv/relatedEntity/${id}`);
  }
}

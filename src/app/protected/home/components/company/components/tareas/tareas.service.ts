import { Injectable } from '@angular/core';
import { environment } from '../../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea, TareaEstado, TareaRequest } from './models/tareas.model';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(
    private  http: HttpClient,
  ) { }

  getTareasByEmpleado(idEmpleado: number): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${environment.gamypeApi}fitinv/tareas/employee/${idEmpleado}`);
  }

  getEstadosTareas(): Observable<TareaEstado[]> {
    return this.http.get<TareaEstado[]>(`${environment.gamypeApi}fitinv/estados`);
  }

  createOrEditTarea(tarea: TareaRequest): Observable<Tarea> {
    return this.http.post<Tarea>(`${environment.gamypeApi}fitinv/tareas`, tarea);
  }

  deleteTarea(idTarea: number): Observable<void> {
    return this.http.delete<void>(`${environment.gamypeApi}fitinv/tareas/${idTarea}`);
  }

  getTareasCompany(idCompany): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${environment.gamypeApi}fitinv/tareas/company/${idCompany}`);
  }
}

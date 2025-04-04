import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { environment } from '../../../../../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { getInventario, getInventarioHistorial, GetMovimientos, Inventario } from './models/inventario.model';
import { Lote, MovimientoCreate } from './lote/models/lote.model';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private selectedIdinventario: BehaviorSubject<number> = new BehaviorSubject<number>(null);

  constructor(
    private http: HttpClient,
    private companyService: CompanyService,
  ) {

  }

  setSelectIdInventario(id: number) {
    this.selectedIdinventario.next(id);
  }

  getSelectIdInventario(): Observable<number> {
    return this.selectedIdinventario.asObservable();
  }

  getSelectedIdInventarioValue(): number {
    return this.selectedIdinventario.value;
  }

  getIdInventarioValue(): number {
    return this.selectedIdinventario.value;
  }

  getInvetarios(): Observable<getInventario[]> {
    return this.http.get<getInventario[]>(`${environment.gamypeApi}fitinv/inventory/${this.companyService.getCompanyId()}`);
  }

  createInventario(inventario: Inventario) {
    return this.http.post(`${environment.gamypeApi}fitinv/inventory/${this.companyService.getCompanyId()}`, inventario);
  }

  getInventario(id?: number): Observable<Inventario> {
    return this.http.get<Inventario>(`${environment.gamypeApi}fitinv/inventory/${this.companyService.getCompanyId()}/${id || this.selectedIdinventario.value}`);
  }

  deleteInventario(id: number) {
    return this.http.delete(`${environment.gamypeApi}fitinv/inventory/${this.companyService.getCompanyId()}/${id}`);
  }

  getLotes(id?: number) {
    return this.http.get(`${environment.gamypeApi}fitinv/inventory/elemento/lotes/${id || this.selectedIdinventario.value}`);
  }

  createOrEditLote(lote: Lote) {
    return this.http.post(`${environment.gamypeApi}fitinv/inventory/lote/${this.companyService.getCompanyId()}`, lote);
  }

  deleteLote(id: number) {
    return this.http.delete(`${environment.gamypeApi}fitinv/inventory/lote/${this.companyService.getCompanyId()}/${id}`);
  }

  extecuteOperacion(operacion: MovimientoCreate) {
    return this.http.post(`${environment.gamypeApi}fitinv/operation/executed`, operacion);
  }

  getEjecuciones(idInventario: number): Observable<getInventarioHistorial[]> {
    return this.http.get<getInventarioHistorial[]>(`${environment.gamypeApi}fitinv/operation/executed/${this.companyService.getCompanyId()}?inventoryId=${idInventario}`);
  }
  
  getMovimientos(idInventario: number, month: number, year: number): Observable<GetMovimientos[]> {
    return this.http.get<GetMovimientos[]>(`${environment.gamypeApi}fitinv/operation/detailed-history?inventoryId=${idInventario}&month=${month}&year=${year}`);
  }

  exportToExcel(data: any[], fileName: string): void {
    // Crear hoja de trabajo
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    
    // Crear libro de trabajo
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Movimientos');
    
    // Guardar el archivo
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
}

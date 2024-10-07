import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Menu } from '../models/menu.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { EmpresaService } from '../../../../services/empresa.service';
import { havePermission, ROLES_USER_EMPRESA } from '../../../../services/utils/getRolUser';

@Injectable({
  providedIn: 'root'
})
export class LayoutCompanyService {

  private selectedMenu: BehaviorSubject<Menu> = new BehaviorSubject<Menu>(null);

  allRoles: any[] = [];

  constructor(
    private router: Router,
    private companyService: CompanyService,
  ) {
  }

  setSelectedMenu(menu: Menu): void {
    this.selectedMenu.next(menu);
  }

  getSelectedMenu(): Observable<Menu> {
    return this.selectedMenu.asObservable();
  }

  getAllMenus(): Observable<Menu[]> {
    const admin_acces = havePermission(this.companyService.getRolesEmpresaValue(), this.companyService.getRolesAplicacionValue(), ROLES_USER_EMPRESA.ADMIN_EMPRESA);
    const admin_inv = havePermission(this.companyService.getRolesEmpresaValue(), this.companyService.getRolesAplicacionValue(), ROLES_USER_EMPRESA.ADMIN_INVENTARIO);
    const admin_rrhh = havePermission(this.companyService.getRolesEmpresaValue(), this.companyService.getRolesAplicacionValue(), ROLES_USER_EMPRESA.ADMIN_RECURSOS_HUMANOS);
    if(admin_acces) {
      return of([
        {id: 1, name: 'Dashboard', icon: 'pi pi-home', url: '/gamype/company/dashboard'},
        {id: 2, name: 'Cargo', icon: 'pi pi-id-card', url: '/gamype/company/cargo'},
        {id: 3, name: 'Personal', icon: 'pi pi-users', url: '/gamype/company/personal'},
        {id: 6, name: 'inventario', icon: 'pi pi-warehouse', url: '/gamype/company/inventario'},
        {id: 4, name: 'Editar', icon: 'pi pi-pencil', url: '/gamype/company/edit'},
        {id: 5, name: 'Accesos', icon: 'pi pi-key', url: '/gamype/company/delete'},	
      ])
    }
    if(admin_inv){
      return of([
        {id: 1, name: 'Dashboard', icon: 'pi pi-home', url: '/gamype/company/dashboard'},
        {id: 6, name: 'inventario', icon: 'pi pi-warehouse', url: '/gamype/company/inventario'},
      ])
    }
    if(admin_rrhh){
      return of([
        {id: 1, name: 'Dashboard', icon: 'pi pi-home', url: '/gamype/company/dashboard'},
        {id: 2, name: 'Cargo', icon: 'pi pi-id-card', url: '/gamype/company/cargo'},
        {id: 3, name: 'Personal', icon: 'pi pi-users', url: '/gamype/company/personal'},
      ])
    }
    return of([])
  }

  goToUlr(url: string,idEmpresa?: number): void {
    if(url === this.selectedMenu.value.url) return;
    this.router.navigate([url],{ queryParams: { empresa: idEmpresa || this.companyService.getCompanyId() } });
  }

}

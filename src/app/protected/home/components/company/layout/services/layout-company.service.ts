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
        {id: 8, name: 'Tareas', icon: 'pi pi-list', url: '/gamype/company/tareas'},
        {id: 9, name: 'Nominas', icon: 'pi pi-money-bill', url: '/gamype/company/nominas'},
        {id: 6, name: 'Inventario', icon: 'pi pi-warehouse', url: '/gamype/company/inventarios'},
        {id: 7, name: 'Elemento', icon: 'pi pi-box', url: '/gamype/company/elemento'},
        {id: 10, name: 'Operaciones', icon: 'pi pi-cog', url: '/gamype/company/operaciones'},
        {id: 11, name: 'Entidades', icon: 'pi pi-building', url: '/gamype/company/entidades'},
      ])
    }
    if(admin_inv){
      return of([
        {id: 1, name: 'Dashboard', icon: 'pi pi-home', url: '/gamype/company/dashboard'},
        {id: 6, name: 'Inventario', icon: 'pi pi-warehouse', url: '/gamype/company/inventarios'},
        {id: 7, name: 'Elemento', icon: 'pi pi-box', url: '/gamype/company/elemento'},
        {id: 10, name: 'Operaciones', icon: 'pi pi-cog', url: '/gamype/company/operaciones'},
        {id: 11, name: 'Entidades', icon: 'pi pi-building', url: '/gamype/company/entidades'},
      ])
    }
    if(admin_rrhh){
      return of([
        {id: 1, name: 'Dashboard', icon: 'pi pi-home', url: '/gamype/company/dashboard'},
        {id: 2, name: 'Cargo', icon: 'pi pi-id-card', url: '/gamype/company/cargo'},
        {id: 3, name: 'Personal', icon: 'pi pi-users', url: '/gamype/company/personal'},
        {id: 8, name: 'Tareas', icon: 'pi pi-list', url: '/gamype/company/tareas'},
        {id: 9, name: 'Nominas', icon: 'pi pi-money-bill', url: '/gamype/company/nominas'},
      ])
    }
    return of([])
  }

  goToUlr(url: string, idEmpresa?: number, otherParams?: { [key: string]: any }, skip: boolean = false, setSelectedMenu?: string): void {
    if(url === this.selectedMenu?.value?.url && !skip) return;
    const queryParams = {
      empresa: idEmpresa || this.companyService.getCompanyId(),
      ...otherParams
    };
    if(setSelectedMenu) {
      this.getAllMenus().subscribe(menus => {
        const menu = menus.find(m => m.name === setSelectedMenu);
        if(menu) {
          this.setSelectedMenu(menu);
        }
      });
    }
    this.router.navigate([url], { queryParams });
  }

}

import { Component, OnInit } from '@angular/core';
import { LayoutCompanyService } from '../services/layout-company.service';
import { Menu } from '../models/menu.model';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { havePermission } from '../../../../services/utils/getRolUser';
import { EmpresaService } from '../../../../services/empresa.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent implements OnInit {

  menus : Observable<Menu[]> = of([]);

  selectedMenu : Observable<Menu>;


  constructor(
    private layoutCompanyService: LayoutCompanyService,
    private router: Router,
  ) {
    
  }


  ngOnInit(): void {
    this.menus = this.layoutCompanyService.getAllMenus();
    this.selectedMenu = this.layoutCompanyService.getSelectedMenu();

    const currentUrl = this.router.url.split('?')[0];
    this.menus.subscribe(menus => {
      if(!menus) return;
      const menu = menus.find(menu => menu.url === currentUrl);
      console.log(menu);
      if(menu) this.layoutCompanyService.setSelectedMenu(menu);
    })
  }

  selectMenu(menu: Menu): void { 
    this.layoutCompanyService.goToUlr(menu.url);
    this.layoutCompanyService.setSelectedMenu(menu);
  }

}

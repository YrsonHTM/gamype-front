import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ThemeService } from '../../themes/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  items: MenuItem[] | undefined;
  userName = this.authService.getUserData()?.firstname;
  userNameToShow = '';
  tema = 'lara-light-blue';

  constructor(
    private authService: AuthService,
    private router: Router,
    private themeService: ThemeService
  ) {
    this.themeService.getCurrentTheme().subscribe(tema => {
      this.tema = tema;
      this.loadItems();
    });
    this.userNameToShow = this.userName.length > 20 ? this.userName.slice(0, 20) + '...' : this.userName;
  }

  loadItems(){
    this.items = [

              {
                  label: 'Ajustes',
                  icon: 'pi pi-cog',
                  routerLink: '/gamype/settings'
              },
              {
                  label: this.tema.includes('light') ? 'Modo oscuro' : 'Modo claro',
                  icon: this.tema.includes('light') ? 'pi pi-moon' : 'pi pi-sun',
                  command: () => {
                    this.themeService.switchTwoThemes();
                  }
              },
              {
                separator: true,
              },
              {
                label: 'Cerrar sesión',
                icon: 'pi pi-sign-out',
                command: () => {
                  this.logout();
                }
              }
  ];
  }

  logout() {
    this.authService.logOut(this.router);
  }

}

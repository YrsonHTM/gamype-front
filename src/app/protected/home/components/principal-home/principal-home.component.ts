import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-principal-home',
  templateUrl: './principal-home.component.html',
  styleUrl: './principal-home.component.scss'
})
export class PrincipalHomeComponent {

  userName = this.authService.getUserData()?.firstname + ' ' + this.authService.getUserData()?.lastname;
  userNameToShow = '';

  items: MenuItem[];

  constructor(
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService
  ) {
    this.userNameToShow = this.userName.length > 20 ? this.userName.slice(0, 20) + '...' : this.userName;
    this.items = [
      {
          label: 'Ver',
          command: () => {
              this.update();
          }
      },
      {
          label: 'Eliminar',
          command: () => {
              this.delete();
          }
      },
      {
          label: 'Editar',
          command: () => {
              this.save('success');
          }
      }
  ];
  }

  save(severity: string) {
    this.messageService.add({ severity: severity, summary: 'Success', detail: 'Data Saved' });
  }

  update() {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
  }

  delete() {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Deleted' });
  }

  goToCreateCompany() {
    this.router.navigate(['gamype/create-company']);
  }
  
}

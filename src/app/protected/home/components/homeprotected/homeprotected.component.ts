import { Component } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homeprotected',
  templateUrl: './homeprotected.component.html',
  styleUrl: './homeprotected.component.scss'
})
export class HomeprotectedComponent {

  userData = this.authService.getUserData();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  goToCreateCompany() {
    this.router.navigate(['home/create-company']);
  }

}

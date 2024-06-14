import { Component } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-homeprotected',
  templateUrl: './homeprotected.component.html',
  styleUrl: './homeprotected.component.scss'
})
export class HomeprotectedComponent {

  userData = this.authService.getUserData();

  constructor(
    private authService: AuthService
  ) {
    console.log(this.userData)
  }

}

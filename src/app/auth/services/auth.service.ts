import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { Login } from '../models/login.interface';
import { UserData } from '../models/userData.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlRegister = environment.gamypeApi + 'fitinv/auth/register';
  urlLogin = environment.gamypeApi + 'fitinv/auth/login';

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userData: BehaviorSubject<UserData | null> = new BehaviorSubject<UserData | null>(null);

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  registerUser(user: any) {
    return this.http.post(this.urlRegister, user).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  setLoggedIn(value: boolean) {
    this.loggedIn.next(value);
  }

  setUserData(value: UserData | null) {
    this.userData.next(value);
  }

  getUserData() {
    return this.userData.value;
  }

  validateToken() {
    const token = localStorage.getItem('token');
    if (token) {
      const jwtHelper = new JwtHelperService();
      if (jwtHelper.isTokenExpired(token)) {
        this.setLoggedIn(false);
        this.setUserData(null);
        localStorage.removeItem('token');
      } else {
        this.setLoggedIn(true);
      }
    } else {
      this.setLoggedIn(false);
      this.setUserData(null);
    }
    return this.loggedIn.value;
  }

  login(login: Login) {
    return this.http.post(this.urlLogin, login).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        this.setUserData(res);
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

}

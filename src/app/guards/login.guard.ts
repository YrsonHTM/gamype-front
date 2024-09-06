import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth/services/auth.service';
import { firstValueFrom } from 'rxjs';


export const loginGuard = async () => {
    const router = inject(Router);
    const authService = inject(AuthService);
    const token = localStorage.getItem('token');
    const jwtHelper = new JwtHelperService();

    if(!localStorage.getItem('token')){
        localStorage.removeItem('token')
        router.navigate(['/auth/login'])
        return false
    }
    if(jwtHelper.isTokenExpired(token)){
        localStorage.removeItem('token')
        router.navigate(['/auth/login'])
        return false
    }
    //validar si el token es correcto
    const res = await firstValueFrom(authService.getUserByToken());
    if(res){
        return true;
    }
    localStorage.removeItem('token')
    router.navigate(['/auth/login'])
    return false;
}
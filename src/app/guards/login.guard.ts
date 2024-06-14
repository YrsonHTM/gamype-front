import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


export const loginGuard = () => {
    const router = inject(Router);
    const token = localStorage.getItem('token');
    const jwtHelper = new JwtHelperService();

    if(!localStorage.getItem('token')){
        router.navigate(['/auth/login'])
        return false
    }
    if(jwtHelper.isTokenExpired(token)){
        router.navigate(['/auth/login'])
        return false
    }
    //validar si el token es correcto
    
    return true;
}
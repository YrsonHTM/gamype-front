import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth/services/auth.service';
import { firstValueFrom } from 'rxjs';


export const loginGuard = async (  flagName,
    redirectRoute) => {

    const router = inject(Router);
    const authService = inject(AuthService);
    const token = localStorage.getItem('token');
    const jwtHelper = new JwtHelperService();
    if(!localStorage.getItem('token')){
        localStorage.removeItem('token')
        if(redirectRoute.url === '/auth/login'){
            return true;
        }
        router.navigate(['/auth/login'])
        return false
    }
    if(jwtHelper.isTokenExpired(token)){
        localStorage.removeItem('token')
        if(redirectRoute.url === '/auth/login'){
            return true;
        }
        router.navigate(['/auth/login'])
        return false
    }
    //validar si el token es correcto
    try{
        const res = await firstValueFrom(authService.getUserByToken());
    if(res){
        if(redirectRoute.url === '/auth/login'){
            router.navigate(['/gamype'])
        }
        return true;
    }
    localStorage.removeItem('token')
    router.navigate(['/auth/login'])
    return false;   
    }
    catch(e){
        localStorage.removeItem('token')
        if(redirectRoute.url === '/auth/login'){
            return true;
        }
        router.navigate(['/auth/login'])
        return false;
    }

}
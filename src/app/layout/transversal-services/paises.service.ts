import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pais } from './models/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  urlPaises = environment.gamypeApi + 'fitinv/auth/countries';

  constructor(
    private http: HttpClient
  ) { }

  getPaises(): Observable<Pais[]>{

    return this.http.get<Pais[]>(this.urlPaises).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}

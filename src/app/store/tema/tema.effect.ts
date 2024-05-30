import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of, pipe } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { ThemeService } from '../../themes/theme.service';
import { darkAction, lightAction, loadThemeSuccess } from './tema.actions';
import { DOCUMENT } from '@angular/common';
import { initialState } from './tema.reducer';

@Injectable()
export class TemaEffects {

//efecto que carga el tema en el local storage

    loadTema$ = createEffect(() => this.actions$.pipe(
        ofType(lightAction),
        exhaustMap(() => of(null)
            .pipe(
                map((_) => {
                    //establecer tema en el local storage
                    console.log('claro')
                    localStorage.setItem('tema', 'lara-light-blue');
                    const themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
                    if(themeLink) {
                        themeLink.href = `${this.themeService.theme[0]}.css`;
                      }
                    return loadThemeSuccess({ tema: 'lara-light-blue' });
                }),
                catchError(() => EMPTY)
            ))
    ));

    loadTemaDark$ = createEffect(() => this.actions$.pipe(
        ofType(darkAction),
        exhaustMap(() => of(null)
            .pipe(
                map((_) => {
                    //establecer tema en el local storage
                    console.log('oscuro')
                    localStorage.setItem('tema', 'lara-dark-blue');
                    const themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
                    if(themeLink) {
                        themeLink.href = `${this.themeService.theme[1]}.css`;
                      }
                    return loadThemeSuccess({ tema: 'lara-dark-blue' });
                }),
                catchError(() => EMPTY)
            ))
    ));

  constructor(
    private actions$: Actions,
    private themeService: ThemeService,
    @Inject(DOCUMENT) private document: Document
  ) {}
}
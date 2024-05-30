import { Inject, Injectable } from '@angular/core';
import { Theme } from './models/Theme';
import { Store } from '@ngrx/store';
import { darkAction, lightAction } from '../store/tema/tema.actions';
import { BehaviorSubject, skip } from 'rxjs';
import { DOCUMENT } from '@angular/common';

interface AppState {
  tema: string;
}

@Injectable({
  providedIn: 'root'
})

export class ThemeService {

  public theme: Theme[] = ['lara-light-blue', 'lara-dark-blue', 'bootstrap4-light-blue', 'bootstrap4-dark-blue'];

  private selectedTheme: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(this.theme[0]);

  constructor( private store: Store<AppState>, @Inject(DOCUMENT) private document: Document ) {

    if(localStorage.getItem('tema')) {
      this.loadTheme(localStorage.getItem('tema') as Theme);
    }

    this.store.select('tema').pipe(
      skip(1)
    ).subscribe( tema => {
      this.loadTheme(tema as Theme);
    });
    
  }

  switchTheme(theme: Theme) {
    if(theme.includes('dark')) {
      this.store.dispatch( darkAction() );
    }
    if(theme.includes('light')) {
      this.store.dispatch( lightAction() );
    }
  }

  loadTheme(tema: Theme) {
    localStorage.setItem('tema', tema);
      const themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
      if(themeLink) {
          themeLink.href = `${tema}.css`;
        }
  }

}

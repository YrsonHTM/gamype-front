import { createReducer, on } from '@ngrx/store';
import { lightAction, darkAction, resetAction } from './tema.actions';

export const initialState : string = localStorage.getItem('tema') || 'lara-light-blue';

export const temaReducer = createReducer(
  initialState,
  on(lightAction, (state) => state = 'lara-light-blue'),
  on(darkAction, (state) => state = 'lara-dark-blue'),
  on(resetAction, (state) => state = initialState)
);
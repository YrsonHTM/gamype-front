import {createAction, props } from "@ngrx/store";

export const lightAction = createAction('[Tema] light');
export const darkAction = createAction('[Tema] dark');
export const resetAction = createAction('[Tema] reset');
export const loadThemeSuccess = createAction(
    "[menu] load success",
    props<{
      tema: string;
    }>()
  );
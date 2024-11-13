import { CanDeactivateFn } from "@angular/router";
import { LoteComponent } from "../lote/lote.component";

export const canDeactivateGuard: CanDeactivateFn<LoteComponent> = (component: LoteComponent) => {
  component.deactivate();
  return true;
};
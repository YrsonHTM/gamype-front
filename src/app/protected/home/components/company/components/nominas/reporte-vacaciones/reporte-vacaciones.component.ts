import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-reporte-vacaciones',
  templateUrl: './reporte-vacaciones.component.html',
  styleUrl: './reporte-vacaciones.component.scss'
})
export class ReporteVacacionesComponent {
  ref = inject(DynamicDialogRef);

  fb = inject(FormBuilder);

  formVacaciones = this.fb.group({
    date1: [this.getFirstDayOfYear(), Validators.required],
    date2: [new Date(), Validators.required]
  });

  // Obtener el primer día del primer mes del año actual
  private getFirstDayOfYear(): Date {
    const now = new Date();
    return new Date(now.getFullYear(), 0, 1);
  }
  closeDialog(ref) {
    this.formVacaciones.markAllAsTouched();
    Object.keys(this.formVacaciones.controls).forEach(field => {
      const control = this.formVacaciones.get(field);
      control.markAsDirty();
    });
    if(ref){
      if(this.formVacaciones.invalid)
        return;
    }
      this.ref.close(ref);
  }
}

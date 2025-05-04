import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-reporte-prima',
  templateUrl: './reporte-prima.component.html',
  styleUrl: './reporte-prima.component.scss'
})
export class ReportePrimaComponent {

  fb = inject(FormBuilder);

  ref= inject(DynamicDialogRef);

  periodos = [
    'Primer semestre', 'Segundo semestre',
  ];

  formPrima = this.fb.group({
    anio: [new Date(), Validators.required],
    periodo: [this.periodos[0], Validators.required],
  });

  closeDialog(ref) {
    this.formPrima.markAllAsTouched();
    Object.keys(this.formPrima.controls).forEach(field => {
      const control = this.formPrima.get(field);
      control.markAsDirty();
    });
    if(ref){
      if(this.formPrima.invalid)
        return;
    }
      this.ref.close(ref);
  }

}

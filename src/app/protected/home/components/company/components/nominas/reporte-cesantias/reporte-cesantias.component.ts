import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-reporte-cesantias',
  templateUrl: './reporte-cesantias.component.html',
  styleUrl: './reporte-cesantias.component.scss'
})
export class ReporteCesantiasComponent {

  ref = inject(DynamicDialogRef);

  fb = inject(FormBuilder);

  formCesantia = this.fb.group({
    anio: [new Date(), Validators.required],
  });

  closeDialog(ref) {
    this.formCesantia.markAllAsTouched();
    Object.keys(this.formCesantia.controls).forEach(field => {
      const control = this.formCesantia.get(field);
      control.markAsDirty();
    });
    if(ref){
      if(this.formCesantia.invalid)
        return;
    }
      this.ref.close(ref);
  }


}

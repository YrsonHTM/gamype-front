import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OperacionesService } from '../../../operaciones/operaciones.service';
import { getOperation } from '../../../operaciones/models/operacion.model';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-lote-operacion-form',
  templateUrl: './lote-operacion-form.component.html',
  styleUrl: './lote-operacion-form.component.scss'
})
export class LoteOperacionFormComponent implements OnInit {


  fb = inject(FormBuilder);

  operacionesService = inject(OperacionesService);

  ref = inject(DynamicDialogRef);

  operaciones : getOperation[] = [];

  filteredOperaciones: getOperation[] = [];

  tipoMovimiento: string[] = ['Entrada', 'Salida'];

  form = this.fb.group({
    operacion: [null, Validators.required],
    concept: [null, Validators.required],
    executionDate: [new Date()],
    tipoMovimineto: ['Salida', Validators.required],
    movedtStock: [0],
  });

  ngOnInit(): void {
    this.operacionesService.getOperacionesEmpresa().subscribe(operaciones => {
      this.operaciones = operaciones;
      this.filteredOperaciones = operaciones;
    });
  }

  filterOperaciones($event){
    const query = $event.query;
    this.filteredOperaciones = this.operaciones.filter(elemento => elemento.name.toLowerCase().includes(query.toLowerCase()));
  }

  closeDialog(ref) {
    this.form.markAllAsTouched();
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsDirty();
    });
    if(ref){
      if(this.form.invalid)
        return;
    }
      this.ref.close(ref);
  }

}

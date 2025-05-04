import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Arl } from '../../nominas/models/nomina.model';
import { NominasService } from '../../nominas/nominas.service';

@Component({
  selector: 'app-crear-rol',
  templateUrl: './crear-rol.component.html',
  styleUrl: './crear-rol.component.scss'
})
export class CrearRolComponent implements OnInit {

  editMode: boolean = false;

  filteredArl: Arl[];

  arl: Arl[];

  form = this.fb.group({
    idNivelesRiesgoARL: [null as null | Arl, [Validators.required]],
    nombreCargo: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    id: [null]
  });

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    private nominaService: NominasService,
    public config: DynamicDialogConfig,
  ) { }

  ngOnInit(): void {
    this.nominaService.getARL().subscribe(arl => {
      this.filteredArl = arl;
      this.arl = arl;
      this.form.get('idNivelesRiesgoARL').setValue(arl[0]);
    });
    if(this.config.data){
      this.editMode = true;
      const { id, nombre, descripcion, nivelesRiesgoARL } = this.config.data;
      this.form.patchValue({
        id,
        nombreCargo: nombre,
        descripcion: descripcion,
        idNivelesRiesgoARL: nivelesRiesgoARL
      }
      )
    }
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

  filterArl(event) {
    this.filteredArl = this.arl.filter(arl => arl.nombreClase.toLowerCase().includes(event.query.toLowerCase()));
  }

}

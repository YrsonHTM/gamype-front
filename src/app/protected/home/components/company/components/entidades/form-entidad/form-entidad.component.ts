import { Component, inject, OnInit } from '@angular/core';
import { EmpleadoService } from '../../personal/empleado.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DocumentType, EntidadCreate, GetEntidad } from '../models/entidad.model';
import { EntidadesService } from '../entidades.service';

@Component({
  selector: 'app-form-entidad',
  templateUrl: './form-entidad.component.html',
  styleUrl: './form-entidad.component.scss'
})
export class FormEntidadComponent implements OnInit {

  periodos = [
    'Persona Natural',
    'Persona Jurídica'
      ]
    

  empleadosService = inject(EmpleadoService);

  entidadesService = inject(EntidadesService);

  fb = inject(FormBuilder);

  ref = inject(DynamicDialogRef);

  config = inject(DynamicDialogConfig);

  editMode = false;

  filteredTiposDocumentos: DocumentType[] = [];

  tiposDocumentos: DocumentType[] = [];

  form = this.fb.group({
    id: [null],
    name: [null as null | string, Validators.required],
    documentTypeId: [null as null | string | DocumentType, Validators.required],
    identificationCode: [null as null | string],
    contactPhone: [null as null | string, Validators.required],
    email: [null as null | string , Validators.email],
    isNaturalPerson: [this.periodos[0], Validators.required],
    relationType: [true]
  });

  ngOnInit(): void {
    if(this.config.data){
      this.editMode = true;
    }
    this.empleadosService.getTiposDocumentos().subscribe((data: DocumentType[]) => {
      this.tiposDocumentos = data;
      this.filteredTiposDocumentos = data;
      if(this.editMode){
        this.loadData();
      }
    });
    this.valueChanges();
  }

  loadData(){
    this.entidadesService.getEntidadById(this.config.data.id).subscribe((data: EntidadCreate) => {
      this.form.get('id').setValue(data.id);
      this.form.get('name').setValue(data.name);
      this.form.get('documentTypeId').setValue(this.tiposDocumentos.find(tipo => tipo.id === data.documentTypeId));
      this.form.get('identificationCode').setValue(data.identificationCode);
      this.form.get('contactPhone').setValue(data.contactPhone);
      this.form.get('email').setValue(data.email);
      this.form.get('isNaturalPerson').setValue(data.isNaturalPerson ? this.periodos[0] : this.periodos[1]);
      this.form.get('relationType').setValue(data.relationType);
    });
  }

  valueChanges(){
    //telefono solo numeros si es letra se borra
    this.form.get('contactPhone').valueChanges.subscribe((value: string) => {
      //validar si solo es numero y no letras si es numero return
      if(/^\d+$/.test(value)){
        return;
      }

      if(value){
        this.form.get('contactPhone').setValue(value.replace(/\D/g, ''));
      }
    });
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

  filterTiposDocumento($event){
    const query = $event.query;
    this.filteredTiposDocumentos = this.tiposDocumentos.filter(cargo => cargo.nombre.toLowerCase().includes(query.toLowerCase()));
  }

}

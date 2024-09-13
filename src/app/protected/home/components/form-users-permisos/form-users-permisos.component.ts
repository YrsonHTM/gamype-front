import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-form-users-permisos',
  templateUrl: './form-users-permisos.component.html',
  styleUrl: './form-users-permisos.component.scss'
})
export class FormUsersPermisosComponent {
  constructor(public ref: DynamicDialogRef) {}

  closeDialog(ref) {
    console.log('closeDialog', ref);
      this.ref.close(ref);
  }
}

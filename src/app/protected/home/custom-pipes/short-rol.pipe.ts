import { Pipe, PipeTransform } from '@angular/core';
import { nombreRol } from '../services/utils/roles-types';

@Pipe({
  name: 'shortRol'
})
export class ShortRolPipe implements PipeTransform {

  transform(value: nombreRol, ...args: unknown[]): unknown {
    if (value === 'Administrador de inventario') {
      return 'Admin. inventario';
    }
    if (value === 'Administrador de personal') {
      return 'Admin. personal';
    }
    if (value === 'Administrador total') {
      return 'Admin. total';
    }
    return null;
  }

}

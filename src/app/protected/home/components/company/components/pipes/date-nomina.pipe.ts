import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateNomina'
})
export class DateNominaPipe implements PipeTransform {

  transform(value: string, fraccionMes = true): unknown {
    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return fraccionMes ? `${year}-${month}/${day > 15 ? 2 : 1}` : `${year}-${month}`;
  }
}

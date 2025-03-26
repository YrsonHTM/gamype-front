import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'beatyDate'
})
export class BeatyDatePipe implements PipeTransform {

  transform(value: unknown): unknown {
    // 2024-10-20T00:00:00.000+00:00
    return value?.toString().split('T')[0] || '';
  }

}

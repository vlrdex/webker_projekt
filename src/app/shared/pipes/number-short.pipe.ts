import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'numberShort'
})
export class NumberShortPipe implements PipeTransform {

  transform(value: number, decimals: number = 2): string {
    if (isNaN(value)) return '';

    const factor = Math.pow(10, decimals);
    const truncated = Math.trunc(value * factor) / factor;
    return truncated.toFixed(decimals);
  }

}

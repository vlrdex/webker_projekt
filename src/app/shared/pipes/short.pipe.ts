import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'short'
})
export class ShortPipe implements PipeTransform {

  transform(value: string, limit: number = 20, trail: string = '...'): string {
    if (!value) {
      return '';
    }
    if (value.length > limit) {
      return value.substring(0, limit) + trail;
    }
    return value;
  }

}

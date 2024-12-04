import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperCase',
  standalone: true,
})
export class toUpperCase implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }
    return value.toUpperCase();
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'costum',
  standalone: true
})
export class CostumPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

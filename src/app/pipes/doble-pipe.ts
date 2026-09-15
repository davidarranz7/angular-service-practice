import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'doble',
})
export class DoblePipe implements PipeTransform {
  transform(value: number): number {
    return value * 2;
  }
}

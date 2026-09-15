import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'saludo',
})
export class SaludoPipe implements PipeTransform {
  transform(name: string): string {
    return `¡Hola, ${name}!`;
  }
}

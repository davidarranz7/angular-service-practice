import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resaltar',
})
export class ResaltarPipe implements PipeTransform {
  transform(text: string): string {
    return `<strong>${text}</strong>`;
  }
}

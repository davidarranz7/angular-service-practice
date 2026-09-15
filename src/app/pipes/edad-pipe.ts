import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edad',
})
export class EdadPipe implements PipeTransform {
  transform(birthDate: string): number {
    const birth = new Date(birthDate);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();

    const monthDifference = today.getMonth() - birth.getMonth();
    const dayDifference = today.getDate() - birth.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    return age;
  }
}

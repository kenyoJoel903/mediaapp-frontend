import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let date = new Date(value);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

}

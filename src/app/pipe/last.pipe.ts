import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'last'
})
export class LastPipe implements PipeTransform {
  transform(value: string, args?: any): any {
    if (value) {
      return value.split('_').join(' ');
    }
    return value;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'last'
})
export class LastPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (value && value.toLowerCase() !== 'all' && value.toLowerCase() !== 'total') {
      return 'Last ' + value;
    }
    return value;
  }

}

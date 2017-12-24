import { Pipe, PipeTransform } from '@angular/core';
import { isNullNumber } from '../utils/value-utils';

@Pipe({
  name: 'percentage'
})
export class PercentagePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!isNullNumber(value)) {
      return value + '%';
    }
    return value;
  }

}

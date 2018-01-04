import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateUnix'
})
export class DateUnixPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return moment(new Date(value * 1000)).format('DD/MM/YYYY HH:mm');
  }

}

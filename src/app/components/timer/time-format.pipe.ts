import { Pipe, PipeTransform } from '@angular/core';
/*
 * Format seconds to hh:mm:ss format
 * Usage:
 *   value | timeFormat
 * Example:
 *   {{ 243 |  timeFormat}}
 *   formats to: 00:06:03
 */
@Pipe({name: 'timeFormat'})
export class TimeFormatPipe implements PipeTransform {
  transform(value: number): string {
    let hour = this.padding(Math.floor(value / 3600));
    let minute = this.padding(Math.floor(value % 3600 / 60));
    let second = this.padding(Math.floor(value % 60));
    return `${hour}:${minute}:${second}`;
  }

  padding(num: number) {
    if(num < 10) {
      return '0' + num;
    }
    return num.toString();
  }
}

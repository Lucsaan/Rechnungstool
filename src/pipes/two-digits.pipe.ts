import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'twoDigits'
})
export class TwoDigitsPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let amount = value;
    amount = ((Math.round(amount*100))/100).toFixed(2);


    return amount;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumAmount'
})
export class SumAmountPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    
    let bill = value;
    let sum = 0;
    for(let journey of bill.journeys){
      sum += journey.amount;  
    }
    sum = sum*1.19;
    let sumString = (Math.round(sum*100)/100).toFixed(2);
    // console.log(sum);
    return sumString;
  }

}

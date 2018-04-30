import { Injectable } from '@angular/core';

@Injectable()
export class SpesenService {

  journeys: any;

  constructor() {
      this.journeys = [];
  }


  addJourney(journey, billNr){
      journey.billNr = billNr;
      this.journeys.push(journey);
      console.log(this.journeys);
      this.journeys.sort((a, b) => {
          return Date.parse(a.date) - Date.parse(b.date);
      });
  }

  removeJourney(journey) {
       let index = this.journeys.indexOf(journey);
       if(index > -1) {
           this.journeys.splice(index, 1);
       }
  }

  getSum() {
      let sum = 0;
      for(let journey of this.journeys) {
          sum += journey.spesen_betrag;
      }
      return sum;
  }
}

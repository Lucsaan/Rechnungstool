import { Injectable } from '@angular/core';

@Injectable()
export class SpesenService {

  journeys: any;
  bills: any;

  constructor() {
      this.journeys = [];
      this.bills = [];
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

  updateArray(journey, bill) {
      for(let bl of this.bills) {
          if(bl.reNr === bill.reNr) {
              for(let jrny of bl.journeys) {
                  if(jrny.number === journey.number) {
                      jrny.uhrzeit_bis = journey.uhrzeit_bis;
                      jrny.uhrzeit_von = journey.uhrzeit_von;
                      jrny.spesen_betrag = journey.spesen_betrag;
                  }
              }
          }
      }
  }
}

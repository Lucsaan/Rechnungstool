import { Observable } from 'rxjs/Rx';
import { Journey } from '../models/journey-model';
import { Bill } from '../models/bill-model';
import { Injectable } from '@angular/core';

@Injectable()
export class BillService {

  bill: Bill = new Bill();
  bills: Array<any> = new Array<any>();
  journey: Journey = new Journey();
  journeys: Array<any> = [];
  docs: Array<any>;
  dbBills: any;
  dbJourneys: any;
  edit = false;
  private data: Observable<Array<Journey>>;
  

  constructor() {
    this.dbBills = new PouchDB('bills');
    this.dbJourneys = new PouchDB('journeys');
    this.getBills();
    

  }

  getBills() {
    const dataBase = this.dbBills.allDocs({ include_docs: true, descending: true });
    dataBase.then((data) => {
      console.log(data);
      this.bills = data.rows;
      console.log(this.bills);
      this.initiateBills();
      
      if(this.bills.length > 0 ) {
         this.getBill(this.bills[0].id);
      }
     
    });
    

  }

  getBill(id){
    console.log(id);
    this.dbBills.get(id).then((bill) => {
      console.log(bill);
      this.getJourneys(bill);
    });

  }

  getJourney(id){
    console.log(id);
    return this.dbJourneys.get(id);
  }

  getJourneys(bill) {
    this.data = new Observable((observer => {
      for (let id of bill.journeys) {
        this.getJourney(id).then((journey) => {
          observer.next(journey);
        });
      }
    }));

    let subscribe = this.data.subscribe(
      value => this.journeys.push(value),
      error => console.log('Fehler beim Holen der Journeys (billService.loadJourneys')
    );
    console.log(this.journeys);
  }

  newJourney() {
    if(this.edit){
      this.edit = false;
    }
    this.journey = new Journey();
  }

  newBill(){
    this.bill = new Bill();
    this.bill._id = new Date().toISOString();
    this.dbBills.put(this.bill, function callback(err, result) {
      if (!err) {
        console.log('Successfully posted or updated a bill!');
      } else {
        console.log(err);
      }
    });
  }

  initiateBills() {
    console.log(this.bills.length);
    if (this.bills.length > 0) {
      console.log(this.bills);
      this.bill = this.bills[0].doc;
    } else {
      this.bill._id = new Date().toISOString();
      
    }
  }

  editJourney(journey) {
    this.edit = true;
    this.journey = journey;
  }

  saveJourney() {
    console.log(this.journey._id);
    if (!this.edit) {
      this.journey._id = new Date().toISOString();
      this.journeys.push(this.journey);
      this.bill.journeys.push(this.journey._id);
      this.dbBills.put(this.bill, function callback(err, result) {
        if (!err) {
          console.log('Successfully posted or updated a bill!');
        } else {
          console.log(err);
        }
      });
    }
    this.dbJourneys.put(this.journey, function callback(err, result) {
      if (!err) {
        console.log('Successfully posted or updated a journey!');
      }
    });
    
    
    this.journey = new Journey();
    this.edit = false;
  }

  deleteBill(bill){
    this.dbBills.remove(bill).then(()=>{
      console.log('removed');
    });

  }

}

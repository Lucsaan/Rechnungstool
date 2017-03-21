import { Journey } from '../models/journey-model';
import { Bill } from '../models/bill-model';
import { Injectable } from '@angular/core';

@Injectable()
export class BillService {

  bill: Bill;
  journey: Journey;
  bills: Array<any>;
  docs: Array<any>;
  db: any;

  constructor() {
    this.db = new PouchDB('bills');
    this.bills = new Array<any>();
    this.bill = new Bill();
    this.journey = new Journey();
    this.getDataFromDatabase();

  }

  getDataFromDatabase() {
    const dataBase = this.db.allDocs({ include_docs: true, descending: true });
    dataBase.then((data) => {
      this.bills = data.rows;
      this.initiateBills();
    });

  }
  initiateBills() {
    console.log(this.bills.length);
    if (this.bills.length > 0) {
      console.log('Bin drin');
      this.bill = this.bills[0].doc;
    } else {
      this.bill._id = new Date().toISOString();
      this.bill.journeys = new Array<Journey>();
    }
  }

  saveJourney(edit?) {
    if(!edit){
      this.bill.journeys.push(this.journey);
    }
    
    this.db.put(this.bill, function callback(err, result) {
      if (!err) {
        console.log('Successfully posted a todo!');
      } else {
        console.log(err);
      }
    });
    this.journey = new Journey();
  }

  deleteBill(bill){
    this.db.remove(bill).then(()=>{
      console.log('removed');
    });

  }

}

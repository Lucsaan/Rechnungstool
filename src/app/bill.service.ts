import { Vendor } from '../models/vendor-model';
import { Customer } from '../models/customer-model';
import { Observable } from 'rxjs/Rx';
import { Journey } from '../models/journey-model';
import { Bill } from '../models/bill-model';
import { Injectable } from '@angular/core';

@Injectable()
export class BillService {

  bill: Bill = new Bill();
  customer: Customer = new Customer();
  vendor: Vendor = new Vendor();
  bills: Array<any> = new Array<any>();
  journey: Journey = new Journey();
  journeys: Array<any> = [];
  customers: Array<Customer> = [];
  docs: Array<any>;
  dbBills: any = new PouchDB('bills');
  dbJourneys: any = new PouchDB('journeys');
  dbVendor: any = new PouchDB('vendors') ;
  dbCustomer: any = new PouchDB('customers');

  editModeJourney = false;
  editModeCustomer = false;
  editModeVendor = false;
  addModeCustomer = false;
  private index: number;
  private data: Observable<Array<Journey>>;


  constructor() {
    this.getBills();
    this.getVendorCustomer();
  }

  getBills() {
    const dataBase = this.dbBills.allDocs({ include_docs: true, descending: true });
    dataBase.then((data) => {
      this.bills = data.rows;
      this.initiateBills();

      if (this.bills.length > 0 ) {
         this.getBill(this.bills[0].id);
      }

    });
  }

  getVendorCustomer(){
    const dataBaseCustomer = this.dbCustomer.allDocs({include_docs: true, descending: true});
    const dataBaseVendor = this.dbVendor.allDocs({include_docs: true, descending: true});

    dataBaseCustomer.then((customers) => {
      this.customers = customers.rows;
      if(this.customers.length < 1){
        this.addModeCustomer = true;
      }
      console.log(customers);
    });
  }

  getBill(id) {
    console.log(id);
    this.dbBills.get(id).then((bill) => {
      console.log(bill);
      this.getJourneys(bill);
    });

  }

  getJourney(id) {
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

    const subscribe = this.data.subscribe(
      value => this.journeys.push(value),
      error => console.log('Fehler beim Holen der Journeys (billService.loadJourneys')
    );
    console.log(this.journeys);
  }

  newJourney() {
    if(this.editModeJourney){
      this.editModeJourney = false;
    }
    this.journey = new Journey();
  }

  newBill(){
    this.bill = new Bill();
    this.journeys = [];
    this.bill._id = new Date().toISOString();
    this.updateBill();
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

  editJourney(journey, i) {
    this.editModeJourney = true;
    this.journey = journey;
    this.index = i;
  }
  editCustomer(customer, i){
    this.editModeCustomer = true;
    this.customer = customer;
    this.index = i;
  }

  gotoCustomer(status){
    switch(status){
      case (-1):
        
    }
  }
  
  saveCustomer(){
    if (!this.editModeCustomer) {
      this.customer._id = new Date().toISOString();
      this.customers.push(this.customer);
    }
    this.bill.customer = this.customer;
    this.updateBill();
    this.dbCustomer.put(this.customer).then((response) => {
      console.log('Successfully posted or updated a customer!');
      if(this.editModeCustomer){
        this.customer[this.index]._rev = response.rev;
      }
    }).catch((err) => {
      console.log(err);
    });
    
    
    this.journey = new Journey();
    this.editModeJourney = false;

  }

  saveJourney() {
    if (!this.editModeJourney) {
      this.journey._id = new Date().toISOString();
      this.journeys.push(this.journey);
      this.bill.journeys.push(this.journey._id);
      this.updateBill();
      
    }
   
    this.dbJourneys.put(this.journey).then((response) => {
      console.log('Successfully posted or updated a journey!');
      if(this.editModeJourney){
        this.journeys[this.index]._rev = response.rev;
      }
    }).catch((err) => {
      console.log(err);
    });
    
    
    this.journey = new Journey();
    this.editModeJourney = false;
  }

  deleteBill(bill){
    this.dbBills.remove(bill).then(()=>{
      console.log('removed');
    });

  }

  updateBill() {
   this.dbBills.put(this.bill).then((response) => {
      console.log('Successfully posted or updated a bill');
      if(this.bill._rev !== undefined){
        this.bill._rev = response.rev;
      }
    }).catch((err) => {
      console.log(err);
    })
  }
  deleteJourney(journey) {
    this.dbJourneys.remove(journey).then(() => {
      console.log(' Journey removed');
    })
   
   this.bill.journeys.forEach((value, index) => {
      if (journey._id === value) {
        this.bill.journeys.splice(index, 1);
        this.journeys.splice(index, 1);
        this.updateBill();
      }
    });
    
  }

}

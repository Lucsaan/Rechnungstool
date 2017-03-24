import { removeDebugNodeFromIndex } from '@angular/core/src/debug/debug_node';
import { DbService } from './db.service';
import { Vendor } from '../../models/vendor-model';
import { Customer } from '../../models/customer-model';
import { Observable } from 'rxjs/Rx';
import { Journey } from '../journey';
import { Bill } from '../bill';
import { Injectable } from '@angular/core';


@Injectable()
export class BillService {

  bill: any = new Bill();
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


  constructor(private dbService: DbService) {
    let db = new PouchDB('bills');
    this.initiate();
  }

  initiate(){
    this.getBillIds();
    this.journey = new Journey();
    console.log(this.journey);
  }

  getBillIds() {
    this.dbService.getAllDocs('bills', false, true).then((data) => {
      this.bills = data.rows;
      this.bills.length > 0 ? this.getBill(this.bills[0].id) : this.bill = new Bill();
    }).catch ((error) => {
      console.log('Failed loading Bills');
      console.log(error);
    });
  }

  getBill(id) {
    this.dbService.getDoc('bills', id).then((bill) => {
      this.bill = bill;
    }).catch((error) => {
      console.log('Failed loading Bill');
      console.log(error);
    });
  }

  saveBill() {
    this.dbService.saveDoc('bills', this.bill).then((response) => {
      console.log('Bill saved!');
      // catch bill with new revision
      this.getBill(this.bill._id);
    });
  }

  saveJourney(journey?) {
    if (journey === undefined) {
      this.bill.journeys.push(this.journey);
    }else {
      journey.edit = false;
      console.log(journey);
    }
    console.log('Journey saved!');
    this.saveBill();
    this.journey = new Journey();
  }

  

   editJourney(journey) {
    journey.edit = true;
  }
   deleteJourney(index) {
     this.bill.journeys.splice(index, 1);
     console.log('Journey removed!');
     this.saveBill();
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
 
   
  
}

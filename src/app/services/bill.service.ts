import { removeDebugNodeFromIndex } from '@angular/core/src/debug/debug_node';
import { DbService } from './db.service';
import { Vendor } from '../../models/vendor-model';
import { Customer } from '../../models/customer-model';
import { Observable } from 'rxjs/Rx';
import { Journey } from '../journey';
import { Bill } from '../bill';
import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable,FirebaseObjectObservable} from 'angularfire2';
import { Router } from '@angular/router';
import * as jsPdf from 'jspdf';
import { PdfService } from '../services/pdf.service';


@Injectable()
export class BillService {

  bill: Bill = new Bill();

  customer: Customer;
  newCustomer: Customer = new Customer();
  dbVendor: FirebaseObjectObservable<Vendor>;
  vendor: Vendor;
  billVendor: Vendor;
  bills: FirebaseListObservable<Bill[]>;
  dbCustomers: FirebaseListObservable<Customer[]>;
  customers: Customer[] = [];
  journey: Journey = new Journey();

  editModeJourney = false;
  editModeCustomer = false;
  editModeVendor = false;
  addModeCustomer = false;
  private index: number;
  private data: Observable<Array<Journey>>;

  constructor(private router : Router, private dbService: DbService, private af: AngularFire, private pdfService : PdfService) {
    this.bills = af.database.list('/bills');
    this.dbVendor = af.database.object('/vendor');
    this.dbCustomers = af.database.list('/customers');
    this.initiateBill();
    this.getBills();
    this.getCustomers();
  }
  initiateBill() {
    this.journey = new Journey();
    this.bill = new Bill();
    this.vendor = new Vendor();
    this.bill.vendor = this.vendor;
    this.customer = new Customer();
  }

  getBills() {
    this.bills.subscribe(bills => {
      if (bills.length === 0) {
        this.bills.push(new Bill());
      }
      this.bill = bills[bills.length - 1];
      console.log(this.bill.customer);
      if (this.bill.vendor === undefined) {
        this.setVendor();
      }
    });
  }

  updateBill() {
    this.bills.update(this.bill.$key, this.bill);
  }

  updateVendor() {
    this.dbVendor.update(this.vendor);
    console.log(this.vendor);
  }

  setVendor() {
    this.bill.vendor = this.vendor;
    this.dbVendor.subscribe(vendor => {
      if (vendor.$value === null) {
        this.editModeVendor = true;
      }
      console.log(vendor);
      this.updateBill();
      this.updateVendor();
    })
  }

  saveVendor() {
    this.updateBill();
    this.vendor = this.bill.vendor;
    this.updateVendor();
    this.editModeVendor = false;
  }

  changeVendor() {

    if (this.bill.done === true) {
      return;
    }
    this.editModeVendor = true;
  }

  saveJourney(journey?) {
    if (this.bill.journeys === undefined) {
      this.bill.journeys = new Array<Journey>();
    }

    if (journey === undefined) {
      this.bill.journeys.push(this.journey);
    } else {
      journey.edit = false;
    }
    this.updateBill();
    this.journey = new Journey();

  }

  editJourney(journey) {
    journey.edit = true;
  }

  deleteJourney(index) {
    this.bill.journeys.splice(index, 1);
    console.log('Journey removed!');
    this.updateBill();
  }

  setCustomer(customer) {
    this.bill.customer = customer;
    console.log(customer);
    this.updateBill();
    this.navigateRechnungsDaten();
  }

  saveNewCustomer() {
    this.bill.customer = this.newCustomer;
    this.dbCustomers.push(this.newCustomer);
    this.newCustomer = new Customer();
    this.getCustomers();
    this.updateBill();
    this.navigateRechnungsDaten();
}
  getCustomers(){
    this.dbCustomers.subscribe(customers => {
      console.log(customers);
       this.customers = customers;
    })
  }
  deleteCustomer(customer){
    this.dbCustomers.remove(customer);
  }

  navigateRechnungsDaten(){
    this.router.navigate(['/Rechnungsdaten']);
    
  }
  navigateEmpfaenger(){
    this.router.navigate(['/Empfänger']);
  }
  navigateBillPreview(){
    this.router.navigate(['/Vorschau']);
  }
  createPdf(){
    console.log(this.bill.journeys[0].date);
    this.navigateBillPreview();
    //this.pdfService.createPdf(this.bill);    
  }








}

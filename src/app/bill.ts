import { Customer } from '../models/customer-model';
import { Journey } from './journey';
import { Vendor } from "../models/vendor-model";
import { DbService } from "./services/db.service";
import {FirebaseListObservable} from 'angularfire2';

export class Bill {

    _id?: string;
    _rev?: string;
    $key: string;
    billDate?: string;
    customer?: Customer;
    vendor?: Vendor;
    done: boolean;
    reNr?: string;
    journeys: Array<Journey> = [];

    constructor() {
        this.vendor = { name: '', street : '', city : ''};
        this.done = false;
        this.journeys = new Array<Journey>();
    }

    setVendor(af) {
        
        /*dbService.getAllDocs('bills', false, true).then((data) => {
            let vendors = data.rows;
            console.log(vendors);
            vendors.length > 0 ? this.getVendorFromDatabase(vendors[0].id, dbService) : console.log('kein Vendor');
        }).catch((error) => {
            console.log('Failed loading Vendor 1');
            console.log(error);
        });*/
    }

    /*getVendorFromDatabase(id, dbService) {
        dbService.getDoc('vendor', id).then((vendor) => {
            this.vendor.name = vendor.name;
            this.vendor.street = vendor.street;
            this.vendor.city = vendor.city;
        }).catch((error) => {
            console.log('Failed loading Vendor 2');
            console.log(error);
        });
    }*/


}

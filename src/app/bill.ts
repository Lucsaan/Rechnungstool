import { Customer } from '../models/customer-model';
import { Journey } from './journey';
import { Vendor } from "../models/vendor-model";
import { DbService } from "./services/db.service";

export class Bill {

    _id: string;
    _rev?: string;
    billDate?: string;
    customer?: Customer;
    vendor?: Vendor;
    done: boolean;
    reNr?: string;
    journeys: Array<Journey> = [];

    constructor(dbService) {
        this._id = new Date().toISOString();
        this.vendor = {_id: new Date().toISOString() , name: '', street: '', city: ''};
        this.setVendor(dbService);
        this.done = false;
    }

    setVendor(dbService) {
        dbService.getAllDocs('bills', false, true).then((data) => {
            let vendors = data.rows;
            console.log(vendors);
            vendors.length > 0 ? this.getVendorFromDatabase(vendors[0].id, dbService) : console.log('kein Vendor');
        }).catch((error) => {
            console.log('Failed loading Vendor 1');
            console.log(error);
        });
    }

    getVendorFromDatabase(id, dbService) {
        dbService.getDoc('vendor', id).then((vendor) => {
            this.vendor.name = vendor.name;
            this.vendor.street = vendor.street;
            this.vendor.city = vendor.city;
        }).catch((error) => {
            console.log('Failed loading Vendor 2');
            console.log(error);
        });
    }


}

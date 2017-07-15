import { Customer } from '../models/customer-model';
import { Journey } from './journey';
import { Vendor } from "../models/vendor-model";
import { DbService } from "./services/db.service";

export class Bill {

    _id?: string;
    _rev?: string;
    $key: string;
    billDate?: Date;
    customer?: Customer;
    vendor?: Vendor;
    done: boolean;
    reNr?: string;
    journeys: Array<Journey> = [];

    constructor() {
        this.done = false;
        this.journeys = new Array<Journey>();
        this.reNr = 'Noch keine Rechnungsnummer vorhanden';
    }

   }

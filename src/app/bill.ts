import { Customer } from '../models/customer-model';
import { Journey } from './journey';
export class Bill {

    _id: string;
    _rev?: string;
    billDate?: string;
    customer?: Customer ;
    vendor?: string;
    done: boolean;
    reNr?: string;
    journeys: Array<Journey> = [];

    constructor() {
        this._id = new Date().toISOString();
        this.done = false;
    }
}

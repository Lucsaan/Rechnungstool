import { Customer } from './customer-model';

export class Bill {
    _id: string;
    _rev?: string;
    billDate: string;
    customer: Customer ;
    vendor: string;
    done: boolean;
    reNr: string;
    journeys: Array<string> = [];

    constructor(){}


}
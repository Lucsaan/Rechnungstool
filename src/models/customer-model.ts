import { Address } from './address-model';

export class Customer {

    _id: string;
    _rev?: string;
    name: string;
    address: Address = {street: '', zip: '', city: ''};

    constructor() {}
}

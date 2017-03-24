import { Address } from './address-model';

export class Customer {

    _id: string;
    _rev?: string;
    name: string;
    address: Address; 

    constructor() {
        this.address = {
            street: '',
            zip: '',
            city: ''
        }
    }
}


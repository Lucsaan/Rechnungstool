export class Journey {
    _id?: string;
    _rev?: string;
    date: Date;
    start: string ;
    end: string ;
    type: string ;
    number: string ;
    distance?: number;
    amount?: string ;
    bill_id: string;
    edit = false;
    duration?: number;
}

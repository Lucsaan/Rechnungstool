export class Journey {
    _id?: string;
    _rev?: string;
    date: Date;
    start: string ;
    end: string = '77815 Bühl';
    type: string ;
    number: string ;
    amount?: string ;
    bill_id: string;
    edit = false;
    spesen = false;
    uhrzeit_von?: number = 0;
    uhrzeit_bis?: number = 0;
    spesen_betrag?: number = 0;
}

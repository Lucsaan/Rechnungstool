import {Injectable} from '@angular/core';
import * as jsPdf from 'jspdf';


@Injectable()
export class PdfService {

    constructor() {
    }

    createPdf(bill): string {
        let doc = new jsPdf();
        let total = 0;

        //Rechnungssteller
        doc.setFontSize(11);
        doc.text(bill.vendor.name, 20, 20,);
        doc.text('Fahrzeugüberführung', 20, 25);
        doc.text(bill.vendor.street, 20, 30);
        doc.text(bill.vendor.city, 20, 35);
        //Rechnungsfenster Overhead
        doc.setFontSize(9);
        let overhead = bill.vendor.name + ', ' + bill.vendor.street + ', ' + bill.vendor.city;
        doc.text(overhead, 20, 45);
        doc.line(20, 46, 20 + (overhead.length * 1.5), 46);
        //Rechnungsfenster Empfänger
        doc.setFontSize(11);
        let vDistance = 55;
        doc.text('Firma', 20, vDistance);
        doc.text(bill.customer.name, 20, vDistance += 5);
        if (bill.customer.additive !== undefined) {
            doc.text(bill.customer.additive, 20, vDistance += 5);
        }
        doc.text(bill.customer.address.street, 20, vDistance += 5);
        doc.text(bill.customer.address.zip + ' ' + bill.customer.address.city, 20, vDistance += 5);
        //Datum rechts
        doc.text('Datum:', 140, 55);
        doc.text(bill.billDate.slice(8) + '.' + bill.billDate.slice(5, 7) + '.' + bill.billDate.slice(0, 4), 200, 55, 0, 'right');
        doc.text('Rechnungsnr: ', 140, 60);
        doc.text(bill.reNr, 200, 60, 0, 'right');


        //Rechnungstabelle
        let xDatum = 20;
        let xStrecke = 38;
        let xAbgabeort = 80;
        let xTyp = 105;
        let xFahrgestell = 140;
        let xBetrag = 175;
        let xRight = 190;
        let y = 90
        let next = 0;
        doc.text('Datum', xDatum, y);
        doc.text('Stecke', xStrecke, y);
        doc.text('Abgabeort', xAbgabeort, y);
        doc.text('Typ', xTyp, y);
        doc.text('FahrgestellNr', xFahrgestell, y);
        doc.text('Betrag', xBetrag, y);
        doc.line(20, (y + 1), 190, (y + 1));

        doc.setFontSize(9);
        for (let journey of bill.journeys) {
            y += 7;
            total += journey.amount;
            let date = new Date(journey.date);
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let localeDate = day + '.' + month + '.' + year;

            doc.text(localeDate, xDatum, (y));
            doc.text(journey.start, xStrecke, (y));
            doc.text(journey.end, xAbgabeort, (y));
            doc.text(journey.type, xTyp, (y));
            doc.setFontSize(8);
            doc.text(journey.number, xFahrgestell, (y));
            doc.setFontSize(9);
            let amount = (Math.round(journey.amount * 100) / 100).toFixed(2);
            doc.text((amount.toString() + ' €'), xRight, (y), null, null, 'right');
        }
        doc.setFontSize(10);
        let totalString = (Math.round(total * 100) / 100).toFixed(2);
        doc.text('Zwischensumme', xFahrgestell + 20, (y = y + 10), null, null, 'right');
        doc.text(totalString + ' €', xRight, y, null, null, 'right');
        doc.text('Steuersatz', xFahrgestell + 20, (y = y + 5), null, null, 'right');
        doc.text('19 % ', xRight, y, null, null, 'right');
        doc.text('Umsatzsteuer', xFahrgestell + 20, (y = y + 5), null, null, 'right');
        doc.text((Math.round(parseFloat(totalString) * 0.19 * 100) / 100).toFixed(2) + ' €', xRight, y, null, null, 'right');
        doc.setFontStyle('bold');
        doc.text('Gesamt', xFahrgestell + 20, (y = y + 8), null, null, 'right');
        let billSum = (Math.round(parseFloat(totalString) * 1.19 * 100) / 100).toFixed(2);
        doc.text(billSum + ' €', xRight, y, null, null, 'right');

        doc.setFontSize(11);
        doc.setFontStyle('normal');
        doc.text('Bitte überweisen Sie den Gesamtbetrag in Höhe von ' + billSum + ' € auf das unten angegebene Konto.', 20, (y = y + 20));
        doc.text('IBAN: DE75 6629 1300 0010 2235 12   BIC: GENODE61ACH', 20, (y = y + 5));
        doc.text('SteuerNr: 36140/51209', 20, (y = y + 5));
        doc.text('Mit freundlichen Grüßen', 20, (y = y + 15));
        doc.text(bill.vendor.name, 20, (y = y + 15));

        //doc.output('save', bill.billDate + '-' + bill.reNr + '.pdf');
        //doc.output();
        let billDate = new Date(bill.billDate);
        let billDateToString: string = billDate.getDate().toString() + '.' + billDate.getMonth().toString() + '.' + billDate.getFullYear().toString();
        doc.save('Rechnung_' + billDateToString + '_ReNr_' + bill.reNr + '.pdf');
        console.log('RechnungVom_' + billDateToString + '_ReNr_' + bill.reNr + '.pdf');
        window.open(doc.output('datauristring'));
        return 'Supi';//doc.output('dataurlnewwindow');


    }
}

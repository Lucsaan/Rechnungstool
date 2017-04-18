import { Injectable } from '@angular/core';
import * as jsPdf from 'jspdf';


@Injectable()
export class PdfService {

  constructor() { }

    createPdf(bill) : string{
    let doc = new jsPdf();
    let total = 0;

    //Rechnungssteller
    doc.setFontSize(12);
    doc.text (bill.vendor.name, 20, 20,);
    doc.text ('Fahrzeugüberführungen', 20, 25);
    doc.text(bill.vendor.street, 20, 30);
    doc.text(bill.vendor.city, 20, 35);
    //Rechnungsfenster Overhead
    doc.setFontSize(9);
    let overhead = bill.vendor.name + ', ' + bill.vendor.street + ', ' + bill.vendor.city;
    doc.text(overhead, 20, 45);
    doc.line(20, 46, 20 + (overhead.length * 1.5), 46);
    //Rechnungsfenster Empfänger
    doc.setFontSize(12);
    doc.text ('Firma', 20, 55);
    doc.text (bill.customer.name, 20, 60,);
    doc.text(bill.customer.address.street, 20, 65);
    doc.text(bill.customer.address.zip + ' ' + bill.customer.address.city, 20, 70);
    //Datum rechts
    doc.text('Datum:', 140, 55);
    doc.text('20.10.1976', 200, 55, 0, 'right');
    doc.text('Rechnungsnr: ', 140, 60);
    doc.text('101-2017', 200, 60, 0, 'right');


    
    //Rechnungstabelle
    let xDatum = 20;
    let xStrecke = 40;
    let xAbgabeort = 80;
    let xTyp = 110;
    let xFahrgestell = 140;
    let xBetrag = 170;
    let xRight = 183;
    let y = 90
    let next = 0;
    doc.text('Datum', xDatum, y);
    doc.text('Stecke',xStrecke, y);
    doc.text('Abgabeort',xAbgabeort, y);
    doc.text('Typ',xTyp, y);
    doc.text('FahrgestellNr',xFahrgestell, y);
    doc.text('Betrag',xBetrag, y);
    doc.line(20, (y+1), 183, (y+1));

    doc.setFontSize(10);
    for(let journey of bill.journeys){
      y += 7;
      total += journey.amount;
      let date = new Date(journey.date);
      let day = date.getDate();
      let month = date.getMonth()+1;
      let year = date.getFullYear();
      let localeDate = day + "." + month + "." + year;

      doc.text(localeDate, xDatum , (y));
      doc.text(journey.start, xStrecke, (y));
      doc.text(journey.end, xAbgabeort, (y));
      doc.text(journey.type, xTyp, (y));
      doc.text(journey.number, xFahrgestell, (y));
      doc.text((journey.amount.toString() + ' €'), xRight, (y), null, null, 'right');
    }

      doc.text('Zwischensumme', xFahrgestell + 20, (y = y+ 10), null, null, 'right' );
      doc.text(total.toString() + ' €', xRight, y, null, null, 'right');
      doc.text('Steuersatz', xFahrgestell + 20, (y = y+ 5), null, null, 'right' );
      doc.text('19 % ', xRight, y, null, null, 'right');
      doc.text('Umsatzsteuer', xFahrgestell + 20, (y = y+ 5), null, null, 'right' );
      doc.text((total * 0.19) + ' €', xRight, y, null, null, 'right');
      doc.setFontStyle('bold');
      doc.text('Gesamt', xFahrgestell + 20, (y = y+ 8), null, null, 'right' );
      doc.text((total * 1.19) + ' €', xRight, y, null, null, 'right');

      doc.setFontSize(12);
      doc.setFontStyle('normal');
      doc.text('Bitte überweisen Sie den Gesamtbetrag auf das unten angegebene Konto.', 20, (y = y + 20));
      doc.text('IBAN: DE75 6629 1300 0010 2235  BIC: GENODE61ACH', 20, (y = y + 5));
      doc.text('SteuerNr: 36140/51209', 20, (y = y + 5));
      doc.text('Mit freundlichen Grüßen', 20, (y = y + 15));
      doc.text('Dieter Hartmann', 20, (y = y + 15));
      
      
      
      
    
    
    return doc.output('datauristring');


    
  }
}

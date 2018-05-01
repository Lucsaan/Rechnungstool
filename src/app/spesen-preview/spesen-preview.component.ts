import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../app.component';
import {DomSanitizer} from '@angular/platform-browser';
import {PdfService} from '../services/pdf.service';
import {BillService} from '../services/bill.service';
import {SpesenService} from '../services/spesen.service'
import * as jsPdf from 'jspdf';
import {Journey} from '../journey';

@Component({
  selector: 'app-spesen-preview',
  templateUrl: './spesen-preview.component.html',
  styleUrls: ['./spesen-preview.component.css']
})
export class SpesenPreviewComponent implements OnInit {

  constructor(private spesenService: SpesenService) {}

  ngOnInit() {

  }

  createPdf(journeys): string {
      let doc = new jsPdf();
      let total = 0;

      doc.setFontSize(17);
      doc.text('Reisekostenabrechnung', 20, 20);
      doc.setFontSize(14);
      let period = this.dateToString(journeys[0].date) + ' bis ' + this.dateToString(journeys[journeys.length -1].date);
      doc.text(period, 130, 20);
      doc.setFontSize(11);
      doc.text('Name: Dieter Hartmann', 20, 35);
      doc.text('Anschrift: Waldmattstr. 101, 77815 Bühl', 20, 40);

      //Rechnungstabelle
      let xDatum = 20;
      let xReisezeit = 38;
      let xReiseweg = 60;
      let xStunden = 125;
      let xBeleg = 140;
      let xSumme = 175;
      let xRight = 190;
      let y = 55
      let next = 0;
      doc.text('Datum', xDatum, y);
      doc.text('Reisezeit', xReisezeit, y);
      doc.text('Reiseweg', xReiseweg, y);
      doc.text('Std', xStunden, y);
      doc.text('BelegNr.', xBeleg, y);
      doc.text('Summe', xSumme, y);
      doc.line(20, (y + 1), 190, (y + 1));

      y -= 5;
      for (let journey of journeys) {
          doc.setFontSize(9);
          y += 12;
          total += journey.spesen_betrag;

          doc.text(this.dateToString(journey.date), xDatum, (y + 2));
          doc.text(journey.uhrzeit_von + ':00 Uhr', xReisezeit, (y));
          doc.text(journey.start, xReiseweg, (y));
          doc.text((journey.uhrzeit_bis - journey.uhrzeit_von)+'', xStunden, (y + 2));
          doc.text(journey.billNr, xBeleg, (y + 2));
          doc.setFontSize(10);
          doc.text((journey.spesen_betrag + ' €'), xRight - 5, (y + 2), null, null, 'right');
          doc.setFontSize(9);
          doc.text(journey.uhrzeit_bis + ':00 Uhr', xReisezeit, (y + 5));
          doc.text('Rückfahrt nach ' + journey.end + ' mit PKW', xReiseweg, (y + 5));
      }

      doc.setFontSize(10);

      doc.text('Zwischensumme', xBeleg + 20, (y = y + 15), null, null, 'right');
      doc.text(total + ' €', xRight - 5, y, null, null, 'right');
      doc.text('Aus- / Rückzahlung', xBeleg + 20, (y = y + 10), null, null, 'right');
      doc.text(total + ' €', xRight - 5, y, null, null, 'right');

      doc.text('Bühl, den ' + this.dateToString(new Date()), 20, y + 20);

      doc.save('Reisekosten' + period + '.pdf');
     return 'Hallo';

  }

  dateToString(journeyDate) {
      console.log(journeyDate);
      let date = new Date(journeyDate);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return day + '.' + month + '.' + year;
  }

}

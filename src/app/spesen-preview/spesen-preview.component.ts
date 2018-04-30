import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../app.component';
import {DomSanitizer} from '@angular/platform-browser';
import {PdfService} from '../services/pdf.service';
import {BillService} from '../services/bill.service';
import {SpesenService} from '../services/spesen.service';

@Component({
  selector: 'app-spesen-preview',
  templateUrl: './spesen-preview.component.html',
  styleUrls: ['./spesen-preview.component.css']
})
export class SpesenPreviewComponent implements OnInit {

  constructor(private spesenService: SpesenService) {}

  ngOnInit() {

  }

}

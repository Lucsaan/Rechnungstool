import { Component, OnInit } from '@angular/core';
import { BillService } from "../services/bill.service";

@Component({
  selector: 'app-vendor-editor',
  templateUrl: './vendor-editor.component.html',
  styleUrls: ['./vendor-editor.component.css']
})
export class VendorEditorComponent implements OnInit {

  constructor(private billService : BillService) { }

  ngOnInit() {
  }

}

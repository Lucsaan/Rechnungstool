import { Component, OnInit } from '@angular/core';
import { BillService } from '../services/bill.service';

@Component({
  selector: 'app-customer-editor',
  templateUrl: './customer-editor.component.html',
  styleUrls: ['./customer-editor.component.css']
})
export class CustomerEditorComponent implements OnInit {

  constructor(private billService: BillService) { }

  ngOnInit() {
  }

}

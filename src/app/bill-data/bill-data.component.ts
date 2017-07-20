import { Component, OnInit, AfterViewInit, ViewChild, Directive, NgModule} from '@angular/core';
import { BillService } from "../services/bill.service";
import { VendorEditorComponent } from "../vendor-editor/vendor-editor.component";
import { EventEmitter } from '@angular/core';
import { FocusDirective} from '../focus.directive';



@NgModule({
  declarations: [FocusDirective]
})

@Component({
  selector: 'app-bill-data',
  templateUrl: './bill-data.component.html',
  styleUrls: ['./bill-data.component.css']  
})
export class BillDataComponent implements OnInit {

  
  constructor(private billService: BillService) {}

  ngOnInit() {
    console.log('ngOnInit');
    this.billService.afterLogin();
  }

  
  changeBillNumber() {
    this.billService.editModeBillNumber = true;
  }


  

}

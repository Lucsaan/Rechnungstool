import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BillService } from './services/bill.service';
import { MaterialModule } from '@angular/material';
import { MdDataTableModule } from 'ng2-md-datatable';
import { DataTableModule } from 'ng2-data-table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DbService } from './services/db.service';
import { AngularFireModule } from 'angularfire2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PdfService } from './services/pdf.service';
import { AuthService} from './services/auth.service';

import { AppComponent } from './app.component';
import { CustomerEditorComponent } from './customer-editor/customer-editor.component';
import { JourneyEditorComponent } from './journey-editor/journey-editor.component';
import { JourneyTableComponent } from './journey-table/journey-table.component';
import { RouterModule, Routes } from '@angular/router';
import { BillDataComponent } from './bill-data/bill-data.component';
import { VendorEditorComponent } from './vendor-editor/vendor-editor.component';
import { CustomerDataComponent } from './customer-data/customer-data.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { BillPreviewComponent } from './bill-preview/bill-preview.component';
import { BillsTableComponent } from './bills-table/bills-table.component';
import { ChooseBillComponent } from './choose-bill/choose-bill.component';
import { SumAmountPipe } from '../pipes/sum-amount.pipe';
import { TwoDigitsPipe } from '../pipes/two-digits.pipe';
import { LoginComponent} from './login/login.component';

const appRoutes: Routes = [
  { path: 'Rechnungsdaten', component: BillDataComponent  }, //BillDataComponent BillPreviewComponent
  { path: 'Empfänger', component: CustomerDataComponent},
  { path: 'Vorschau', component: BillPreviewComponent},
  { path: 'chooseBill', component: ChooseBillComponent},
  
  { path: '',
    redirectTo: '/Rechnungsdaten',
    pathMatch: 'full'
  },
  { path: '**', component: BillDataComponent}
  
];

export const firebaseConfig = {
  apiKey: "AIzaSyACi7Y01RGvrjhjQnBWB-skUrWIUPdU644",
  authDomain: "rechnungstool.firebaseapp.com",
  databaseURL: "https://rechnungstool.firebaseio.com",
  projectId: "rechnungstool",
  storageBucket: "rechnungstool.appspot.com",
  messagingSenderId: "735573527850"
}

@NgModule({
  declarations: [
    AppComponent,
    CustomerEditorComponent,
    JourneyEditorComponent,
    JourneyTableComponent,
    BillDataComponent,
    VendorEditorComponent,
    CustomerDataComponent,
    CustomerListComponent,
    BillPreviewComponent,
    BillsTableComponent,
    ChooseBillComponent,
    SumAmountPipe,
    TwoDigitsPipe,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserAnimationsModule


  ],
  providers: [BillService, DbService, PdfService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

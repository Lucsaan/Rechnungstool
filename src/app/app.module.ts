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
import { AngularFireModule } from 'angularfire2'


import { AppComponent } from './app.component';
import { CustomerEditorComponent } from './customer-editor/customer-editor.component';
import { JourneyEditorComponent } from './journey-editor/journey-editor.component';
import { JourneyTableComponent } from './journey-table/journey-table.component';
import { RouterModule, Routes } from '@angular/router';
import { BillDataComponent } from './bill-data/bill-data.component';
import { VendorEditorComponent } from './vendor-editor/vendor-editor.component';

const appRoutes: Routes = [
  { path: 'Rechnungsdaten', component: BillDataComponent },
  { path: '',
    redirectTo: '/Rechnungsdaten',
    pathMatch: 'full'
  },
  { path: '**', component: BillDataComponent }
  
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
    VendorEditorComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig)


  ],
  providers: [BillService, DbService],
  bootstrap: [AppComponent]
})
export class AppModule { }

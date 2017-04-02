webpackJsonp([1,4],{

/***/ 243:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_vendor_model__ = __webpack_require__(616);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_customer_model__ = __webpack_require__(614);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(676);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_journey_model__ = __webpack_require__(615);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_bill_model__ = __webpack_require__(613);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BillService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var BillService = (function () {
    function BillService() {
        this.bill = new __WEBPACK_IMPORTED_MODULE_4__models_bill_model__["a" /* Bill */]();
        this.customer = new __WEBPACK_IMPORTED_MODULE_1__models_customer_model__["a" /* Customer */]();
        this.vendor = new __WEBPACK_IMPORTED_MODULE_0__models_vendor_model__["a" /* Vendor */]();
        this.bills = new Array();
        this.journey = new __WEBPACK_IMPORTED_MODULE_3__models_journey_model__["a" /* Journey */]();
        this.journeys = [];
        this.customers = [];
        this.dbBills = new PouchDB('bills');
        this.dbJourneys = new PouchDB('journeys');
        this.dbVendor = new PouchDB('vendors');
        this.dbCustomer = new PouchDB('customers');
        this.editModeJourney = false;
        this.editModeCustomer = false;
        this.editModeVendor = false;
        this.addModeCustomer = false;
        this.getBills();
        this.getVendorCustomer();
    }
    BillService.prototype.getBills = function () {
        var _this = this;
        var dataBase = this.dbBills.allDocs({ include_docs: true, descending: true });
        dataBase.then(function (data) {
            _this.bills = data.rows;
            _this.initiateBills();
            if (_this.bills.length > 0) {
                _this.getBill(_this.bills[0].id);
            }
        });
    };
    BillService.prototype.getVendorCustomer = function () {
        var _this = this;
        var dataBaseCustomer = this.dbCustomer.allDocs({ include_docs: true, descending: true });
        var dataBaseVendor = this.dbVendor.allDocs({ include_docs: true, descending: true });
        dataBaseCustomer.then(function (customers) {
            _this.customers = customers.rows;
            if (_this.customers.length < 1) {
                _this.addModeCustomer = true;
            }
            console.log(customers);
        });
    };
    BillService.prototype.getBill = function (id) {
        var _this = this;
        console.log(id);
        this.dbBills.get(id).then(function (bill) {
            console.log(bill);
            _this.getJourneys(bill);
        });
    };
    BillService.prototype.getJourney = function (id) {
        console.log(id);
        return this.dbJourneys.get(id);
    };
    BillService.prototype.getJourneys = function (bill) {
        var _this = this;
        this.data = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"]((function (observer) {
            for (var _i = 0, _a = bill.journeys; _i < _a.length; _i++) {
                var id = _a[_i];
                _this.getJourney(id).then(function (journey) {
                    observer.next(journey);
                });
            }
        }));
        var subscribe = this.data.subscribe(function (value) { return _this.journeys.push(value); }, function (error) { return console.log('Fehler beim Holen der Journeys (billService.loadJourneys'); });
        console.log(this.journeys);
    };
    BillService.prototype.newJourney = function () {
        if (this.editModeJourney) {
            this.editModeJourney = false;
        }
        this.journey = new __WEBPACK_IMPORTED_MODULE_3__models_journey_model__["a" /* Journey */]();
    };
    BillService.prototype.newBill = function () {
        this.bill = new __WEBPACK_IMPORTED_MODULE_4__models_bill_model__["a" /* Bill */]();
        this.journeys = [];
        this.bill._id = new Date().toISOString();
        this.updateBill();
    };
    BillService.prototype.initiateBills = function () {
        console.log(this.bills.length);
        if (this.bills.length > 0) {
            console.log(this.bills);
            this.bill = this.bills[0].doc;
        }
        else {
            this.bill._id = new Date().toISOString();
        }
    };
    BillService.prototype.editJourney = function (journey, i) {
        this.editModeJourney = true;
        this.journey = journey;
        this.index = i;
    };
    BillService.prototype.editCustomer = function (customer, i) {
        this.editModeCustomer = true;
        this.customer = customer;
        this.index = i;
    };
    BillService.prototype.gotoCustomer = function (status) {
        switch (status) {
            case (-1):
        }
    };
    BillService.prototype.saveCustomer = function () {
        var _this = this;
        if (!this.editModeCustomer) {
            this.customer._id = new Date().toISOString();
            this.customers.push(this.customer);
        }
        this.bill.customer = this.customer;
        this.updateBill();
        this.dbCustomer.put(this.customer).then(function (response) {
            console.log('Successfully posted or updated a customer!');
            if (_this.editModeCustomer) {
                _this.customer[_this.index]._rev = response.rev;
            }
        }).catch(function (err) {
            console.log(err);
        });
        this.journey = new __WEBPACK_IMPORTED_MODULE_3__models_journey_model__["a" /* Journey */]();
        this.editModeJourney = false;
    };
    BillService.prototype.saveJourney = function () {
        var _this = this;
        if (!this.editModeJourney) {
            this.journey._id = new Date().toISOString();
            this.journeys.push(this.journey);
            this.bill.journeys.push(this.journey._id);
            this.updateBill();
        }
        this.dbJourneys.put(this.journey).then(function (response) {
            console.log('Successfully posted or updated a journey!');
            if (_this.editModeJourney) {
                _this.journeys[_this.index]._rev = response.rev;
            }
        }).catch(function (err) {
            console.log(err);
        });
        this.journey = new __WEBPACK_IMPORTED_MODULE_3__models_journey_model__["a" /* Journey */]();
        this.editModeJourney = false;
    };
    BillService.prototype.deleteBill = function (bill) {
        this.dbBills.remove(bill).then(function () {
            console.log('removed');
        });
    };
    BillService.prototype.updateBill = function () {
        var _this = this;
        this.dbBills.put(this.bill).then(function (response) {
            console.log('Successfully posted or updated a bill');
            if (_this.bill._rev !== undefined) {
                _this.bill._rev = response.rev;
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    BillService.prototype.deleteJourney = function (journey) {
        var _this = this;
        this.dbJourneys.remove(journey).then(function () {
            console.log(' Journey removed');
        });
        this.bill.journeys.forEach(function (value, index) {
            if (journey._id === value) {
                _this.bill.journeys.splice(index, 1);
                _this.journeys.splice(index, 1);
                _this.updateBill();
            }
        });
    };
    BillService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], BillService);
    return BillService;
}());
//# sourceMappingURL=bill.service.js.map

/***/ }),

/***/ 462:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 462;


/***/ }),

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(589);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(610);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(612);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 609:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bill_service__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(billService) {
        /*this.bill.journeys = [];
        
        this.bill.reNr = '100';
        this.getDatabase();*/
        this.billService = billService;
        this.title = 'app works!';
        this.array = new Array();
        this.db = new PouchDB('bills');
        this.billArray = new Array();
        this.edit = false;
    }
    AppComponent.prototype.billChooser = function (bill) {
        this.billService.bill = bill;
    };
    AppComponent.prototype.editItem = function (edit, event) {
        console.log(event);
        this.edit = edit;
        if (!edit) {
            this.billService.saveJourney();
        }
    };
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["j" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(673),
            styles: [__webpack_require__(670)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__bill_service__["a" /* BillService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__bill_service__["a" /* BillService */]) === 'function' && _a) || Object])
    ], AppComponent);
    return AppComponent;
    var _a;
}());
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 610:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bill_service__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__(573);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(609);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__customer_editor_customer_editor_component__ = __webpack_require__(611);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["b" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_7__customer_editor_customer_editor_component__["a" /* CustomerEditorComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["a" /* MaterialModule */].forRoot()
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_0__bill_service__["a" /* BillService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 611:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bill_service__ = __webpack_require__(243);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerEditorComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CustomerEditorComponent = (function () {
    function CustomerEditorComponent(billService) {
        this.billService = billService;
    }
    CustomerEditorComponent.prototype.ngOnInit = function () {
    };
    CustomerEditorComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* Component */])({
            selector: 'app-customer-editor',
            template: __webpack_require__(674),
            styles: [__webpack_require__(671)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__bill_service__["a" /* BillService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__bill_service__["a" /* BillService */]) === 'function' && _a) || Object])
    ], CustomerEditorComponent);
    return CustomerEditorComponent;
    var _a;
}());
//# sourceMappingURL=customer-editor.component.js.map

/***/ }),

/***/ 612:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 613:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Bill; });
var Bill = (function () {
    function Bill() {
        this.journeys = [];
    }
    return Bill;
}());
//# sourceMappingURL=bill-model.js.map

/***/ }),

/***/ 614:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Customer; });
var Customer = (function () {
    function Customer() {
        this.address = {
            street: '',
            zip: '',
            city: ''
        };
    }
    return Customer;
}());
//# sourceMappingURL=customer-model.js.map

/***/ }),

/***/ 615:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Journey; });
var Journey = (function () {
    function Journey() {
    }
    return Journey;
}());
//# sourceMappingURL=journey-model.js.map

/***/ }),

/***/ 616:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Vendor; });
var Vendor = (function () {
    function Vendor() {
    }
    return Vendor;
}());
//# sourceMappingURL=vendor-model.js.map

/***/ }),

/***/ 670:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(159)();
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900,900italic&subset=latin,cyrillic);", ""]);

// module
exports.push([module.i, ".container {\n    border: solid 1px;\n    border-radius: 10px;\n    height: 100px;\n    \n}\n.input {\n  border: solid 1px;\n  background-color: white;\n  height: 25px;\n}\n\n#leftEingabe {\n  float: left;\n  width: 47%;\n  margin-left: 10px;\n}\n\n#rightEingabe {\n  float: right;\n  width: 47%;\n  margin-right: 10px;\n}\n\n#leftContainer {\n  float: left;\n  width: 49%;\n  margin-left: 10px;\n  margin-top: 10px;\n}\n\n#rightContainer {\n  float: right;\n  width: 49%;\n  margin-right: 10px;\n  background-color: white;\n  margin-top: 10px;\n}\n.toolbar {\n  background-color: saddlebrown; \n  color: white\n  \n  \n  \n}\n\n\n  \n/* -- import Roboto Font ---------------------------- */\n/* -- You can use this tables in Bootstrap (v3) projects. -- */\n/* -- Box model ------------------------------- */\n*,\n*:after,\n*:before {\n  box-sizing: border-box;\n}\n/* -- Demo style ------------------------------- */\nhtml,\nbody {\n  position: relative;\n  min-height: 100%;\n  height: 100%;\n  background: beige;\n}\nhtml {\n  position: relative;\n  overflow-x: hidden;\n  margin: 16px;\n  padding: 0;\n  min-height: 100%;\n  font-size: 62.5%;\n}\nbody {\n  font-family: 'RobotoDraft', 'Roboto', 'Helvetica Neue, Helvetica, Arial', sans-serif;\n  font-style: normal;\n  font-weight: 300;\n  font-size: 1.4rem;\n  line-height: 1rem;\n  letter-spacing: 0.01rem;\n  color: #212121;\n  background-color: #f5f5f5;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n}\n#demo {\n  margin: 20px auto;\n  max-width: 960px;\n}\n\n.shadow-z-1 {\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);\n}\n/* -- Material Design Table style -------------- */\n.table {\n  /*width: 100%;*/\n  max-width: 100%;\n  margin: 0 auto 0 auto;\n  margin-bottom: 1rem;\n  background-color: #fff;\n}\n.table > thead > tr,\n.table > tbody > tr,\n.table > tfoot > tr {\n  -webkit-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n.table > thead > tr > th,\n.table > tbody > tr > th,\n.table > tfoot > tr > th,\n.table > thead > tr > td,\n.table > tbody > tr > td,\n.table > tfoot > tr > td {\n  text-align: left;\n  padding: 1.0rem;\n  vertical-align: top;\n  border-top: 0;\n  -webkit-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n.table > thead > tr > th {\n  font-weight: 400;\n  color: #757575;\n  vertical-align: bottom;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12);\n}\n.table > caption + thead > tr:first-child > th,\n.table > colgroup + thead > tr:first-child > th,\n.table > thead:first-child > tr:first-child > th,\n.table > caption + thead > tr:first-child > td,\n.table > colgroup + thead > tr:first-child > td,\n.table > thead:first-child > tr:first-child > td {\n  border-top: 0;\n}\n.table > tbody + tbody {\n  border-top: 1px solid rgba(0, 0, 0, 0.12);\n}\n.table .table {\n  background-color: #fff;\n}\n.table .no-border {\n  border: 0;\n}\n.table-condensed > thead > tr > th,\n.table-condensed > tbody > tr > th,\n.table-condensed > tfoot > tr > th,\n.table-condensed > thead > tr > td,\n.table-condensed > tbody > tr > td,\n.table-condensed > tfoot > tr > td {\n  padding: 0.8rem;\n}\n.table-bordered {\n  border: 0;\n}\n.table-bordered > thead > tr > th,\n.table-bordered > tbody > tr > th,\n.table-bordered > tfoot > tr > th,\n.table-bordered > thead > tr > td,\n.table-bordered > tbody > tr > td,\n.table-bordered > tfoot > tr > td {\n  border: 0;\n  border-bottom: 1px solid #e0e0e0;\n}\n.table-bordered > thead > tr > th,\n.table-bordered > thead > tr > td {\n  border-bottom-width: 2px;\n}\n.table-striped > tbody > tr:nth-child(odd) > td,\n.table-striped > tbody > tr:nth-child(odd) > th {\n  background-color: #f5f5f5;\n}\n.table-hover > tbody > tr:hover > td,\n.table-hover > tbody > tr:hover > th {\n  background-color: rgba(0, 0, 0, 0.12);\n}\n@media screen and (max-width: 768px) {\n  .table-responsive-vertical > .table {\n    margin-bottom: 0;\n    background-color: transparent;\n  }\n  .table-responsive-vertical > .table > thead,\n  .table-responsive-vertical > .table > tfoot {\n    display: none;\n  }\n  .table-responsive-vertical > .table > tbody {\n    display: block;\n  }\n  .table-responsive-vertical > .table > tbody > tr {\n    display: block;\n    border: 1px solid #e0e0e0;\n    border-radius: 2px;\n    margin-bottom: 1.0rem;\n  }\n  .table-responsive-vertical > .table > tbody > tr > td {\n    background-color: #fff;\n    display: block;\n    vertical-align: middle;\n    text-align: right;\n  }\n  .table-responsive-vertical > .table > tbody > tr > td[data-title]:before {\n    content: attr(data-title);\n    float: left;\n    font-size: inherit;\n    font-weight: 400;\n    color: #757575;\n  }\n  .table-responsive-vertical.shadow-z-1 {\n    box-shadow: none;\n  }\n  .table-responsive-vertical.shadow-z-1 > .table > tbody > tr {\n    border: none;\n    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.24);\n  }\n  .table-responsive-vertical > .table-bordered {\n    border: 0;\n  }\n  .table-responsive-vertical > .table-bordered > tbody > tr > td {\n    border: 0;\n    border-bottom: 1px solid #e0e0e0;\n  }\n  .table-responsive-vertical > .table-bordered > tbody > tr > td:last-child {\n    border-bottom: 0;\n  }\n  .table-responsive-vertical > .table-striped > tbody > tr > td,\n  .table-responsive-vertical > .table-striped > tbody > tr:nth-child(odd) {\n    background-color: #fff;\n  }\n  .table-responsive-vertical > .table-striped > tbody > tr > td:nth-child(odd) {\n    background-color: #f5f5f5;\n  }\n  .table-responsive-vertical > .table-hover > tbody > tr:hover > td,\n  .table-responsive-vertical > .table-hover > tbody > tr:hover {\n    background-color: #fff;\n  }\n  .table-responsive-vertical > .table-hover > tbody > tr > td:hover {\n    background-color: rgba(0, 0, 0, 0.12);\n  }\n}\n.table-striped.table-mc-red > tbody > tr:nth-child(odd) > td,\n.table-striped.table-mc-red > tbody > tr:nth-child(odd) > th {\n  background-color: #fde0dc;\n}\n.table-hover.table-mc-red > tbody > tr:hover > td,\n.table-hover.table-mc-red > tbody > tr:hover > th {\n  background-color: #f9bdbb;\n}\n@media screen and (max-width: 767px) {\n  .table-responsive-vertical .table-striped.table-mc-red > tbody > tr > td,\n  .table-responsive-vertical .table-striped.table-mc-red > tbody > tr:nth-child(odd) {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-striped.table-mc-red > tbody > tr > td:nth-child(odd) {\n    background-color: #fde0dc;\n  }\n  .table-responsive-vertical .table-hover.table-mc-red > tbody > tr:hover > td,\n  .table-responsive-vertical .table-hover.table-mc-red > tbody > tr:hover {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-hover.table-mc-red > tbody > tr > td:hover {\n    background-color: #f9bdbb;\n  }\n}\n.table-striped.table-mc-pink > tbody > tr:nth-child(odd) > td,\n.table-striped.table-mc-pink > tbody > tr:nth-child(odd) > th {\n  background-color: #fce4ec;\n}\n.table-hover.table-mc-pink > tbody > tr:hover > td,\n.table-hover.table-mc-pink > tbody > tr:hover > th {\n  background-color: #f8bbd0;\n}\n@media screen and (max-width: 767px) {\n  .table-responsive-vertical .table-striped.table-mc-pink > tbody > tr > td,\n  .table-responsive-vertical .table-striped.table-mc-pink > tbody > tr:nth-child(odd) {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-striped.table-mc-pink > tbody > tr > td:nth-child(odd) {\n    background-color: #fce4ec;\n  }\n  .table-responsive-vertical .table-hover.table-mc-pink > tbody > tr:hover > td,\n  .table-responsive-vertical .table-hover.table-mc-pink > tbody > tr:hover {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-hover.table-mc-pink > tbody > tr > td:hover {\n    background-color: #f8bbd0;\n  }\n}\n.table-striped.table-mc-purple > tbody > tr:nth-child(odd) > td,\n.table-striped.table-mc-purple > tbody > tr:nth-child(odd) > th {\n  background-color: #f3e5f5;\n}\n.table-hover.table-mc-purple > tbody > tr:hover > td,\n.table-hover.table-mc-purple > tbody > tr:hover > th {\n  background-color: #e1bee7;\n}\n@media screen and (max-width: 767px) {\n  .table-responsive-vertical .table-striped.table-mc-purple > tbody > tr > td,\n  .table-responsive-vertical .table-striped.table-mc-purple > tbody > tr:nth-child(odd) {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-striped.table-mc-purple > tbody > tr > td:nth-child(odd) {\n    background-color: #f3e5f5;\n  }\n  .table-responsive-vertical .table-hover.table-mc-purple > tbody > tr:hover > td,\n  .table-responsive-vertical .table-hover.table-mc-purple > tbody > tr:hover {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-hover.table-mc-purple > tbody > tr > td:hover {\n    background-color: #e1bee7;\n  }\n}\n.table-striped.table-mc-deep-purple > tbody > tr:nth-child(odd) > td,\n.table-striped.table-mc-deep-purple > tbody > tr:nth-child(odd) > th {\n  background-color: #ede7f6;\n}\n.table-hover.table-mc-deep-purple > tbody > tr:hover > td,\n.table-hover.table-mc-deep-purple > tbody > tr:hover > th {\n  background-color: #d1c4e9;\n}\n@media screen and (max-width: 767px) {\n  .table-responsive-vertical .table-striped.table-mc-deep-purple > tbody > tr > td,\n  .table-responsive-vertical .table-striped.table-mc-deep-purple > tbody > tr:nth-child(odd) {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-striped.table-mc-deep-purple > tbody > tr > td:nth-child(odd) {\n    background-color: #ede7f6;\n  }\n  .table-responsive-vertical .table-hover.table-mc-deep-purple > tbody > tr:hover > td,\n  .table-responsive-vertical .table-hover.table-mc-deep-purple > tbody > tr:hover {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-hover.table-mc-deep-purple > tbody > tr > td:hover {\n    background-color: #d1c4e9;\n  }\n}\n.table-striped.table-mc-indigo > tbody > tr:nth-child(odd) > td,\n.table-striped.table-mc-indigo > tbody > tr:nth-child(odd) > th {\n  background-color: #e8eaf6;\n}\n.table-hover.table-mc-indigo > tbody > tr:hover > td,\n.table-hover.table-mc-indigo > tbody > tr:hover > th {\n  background-color: #c5cae9;\n}\n@media screen and (max-width: 767px) {\n  .table-responsive-vertical .table-striped.table-mc-indigo > tbody > tr > td,\n  .table-responsive-vertical .table-striped.table-mc-indigo > tbody > tr:nth-child(odd) {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-striped.table-mc-indigo > tbody > tr > td:nth-child(odd) {\n    background-color: #e8eaf6;\n  }\n  .table-responsive-vertical .table-hover.table-mc-indigo > tbody > tr:hover > td,\n  .table-responsive-vertical .table-hover.table-mc-indigo > tbody > tr:hover {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-hover.table-mc-indigo > tbody > tr > td:hover {\n    background-color: #c5cae9;\n  }\n}\n.table-striped.table-mc-blue > tbody > tr:nth-child(odd) > td,\n.table-striped.table-mc-blue > tbody > tr:nth-child(odd) > th {\n  background-color: #e7e9fd;\n}\n.table-hover.table-mc-blue > tbody > tr:hover > td,\n.table-hover.table-mc-blue > tbody > tr:hover > th {\n  background-color: #d0d9ff;\n}\n@media screen and (max-width: 767px) {\n  .table-responsive-vertical .table-striped.table-mc-blue > tbody > tr > td,\n  .table-responsive-vertical .table-striped.table-mc-blue > tbody > tr:nth-child(odd) {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-striped.table-mc-blue > tbody > tr > td:nth-child(odd) {\n    background-color: #e7e9fd;\n  }\n  .table-responsive-vertical .table-hover.table-mc-blue > tbody > tr:hover > td,\n  .table-responsive-vertical .table-hover.table-mc-blue > tbody > tr:hover {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-hover.table-mc-blue > tbody > tr > td:hover {\n    background-color: #d0d9ff;\n  }\n}\n.table-striped.table-mc-light-blue > tbody > tr:nth-child(odd) > td,\n.table-striped.table-mc-light-blue > tbody > tr:nth-child(odd) > th {\n  background-color: #e1f5fe;\n}\n.table-hover.table-mc-light-blue > tbody > tr:hover > td,\n.table-hover.table-mc-light-blue > tbody > tr:hover > th {\n  background-color: #b3e5fc;\n}\n@media screen and (max-width: 767px) {\n  .table-responsive-vertical .table-striped.table-mc-light-blue > tbody > tr > td,\n  .table-responsive-vertical .table-striped.table-mc-light-blue > tbody > tr:nth-child(odd) {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-striped.table-mc-light-blue > tbody > tr > td:nth-child(odd) {\n    background-color: #e1f5fe;\n  }\n  .table-responsive-vertical .table-hover.table-mc-light-blue > tbody > tr:hover > td,\n  .table-responsive-vertical .table-hover.table-mc-light-blue > tbody > tr:hover {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-hover.table-mc-light-blue > tbody > tr > td:hover {\n    background-color: #b3e5fc;\n  }\n}\n.table-striped.table-mc-cyan > tbody > tr:nth-child(odd) > td,\n.table-striped.table-mc-cyan > tbody > tr:nth-child(odd) > th {\n  background-color: #e0f7fa;\n}\n.table-hover.table-mc-cyan > tbody > tr:hover > td,\n.table-hover.table-mc-cyan > tbody > tr:hover > th {\n  background-color: #b2ebf2;\n}\n@media screen and (max-width: 767px) {\n  .table-responsive-vertical .table-striped.table-mc-cyan > tbody > tr > td,\n  .table-responsive-vertical .table-striped.table-mc-cyan > tbody > tr:nth-child(odd) {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-striped.table-mc-cyan > tbody > tr > td:nth-child(odd) {\n    background-color: #e0f7fa;\n  }\n  .table-responsive-vertical .table-hover.table-mc-cyan > tbody > tr:hover > td,\n  .table-responsive-vertical .table-hover.table-mc-cyan > tbody > tr:hover {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-hover.table-mc-cyan > tbody > tr > td:hover {\n    background-color: #b2ebf2;\n  }\n}\n.table-striped.table-mc-teal > tbody > tr:nth-child(odd) > td,\n.table-striped.table-mc-teal > tbody > tr:nth-child(odd) > th {\n  background-color: #e0f2f1;\n}\n.table-hover.table-mc-teal > tbody > tr:hover > td,\n.table-hover.table-mc-teal > tbody > tr:hover > th {\n  background-color: #b2dfdb;\n}\n@media screen and (max-width: 767px) {\n  .table-responsive-vertical .table-striped.table-mc-teal > tbody > tr > td,\n  .table-responsive-vertical .table-striped.table-mc-teal > tbody > tr:nth-child(odd) {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-striped.table-mc-teal > tbody > tr > td:nth-child(odd) {\n    background-color: #e0f2f1;\n  }\n  .table-responsive-vertical .table-hover.table-mc-teal > tbody > tr:hover > td,\n  .table-responsive-vertical .table-hover.table-mc-teal > tbody > tr:hover {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-hover.table-mc-teal > tbody > tr > td:hover {\n    background-color: #b2dfdb;\n  }\n}\n.table-striped.table-mc-green > tbody > tr:nth-child(odd) > td,\n.table-striped.table-mc-green > tbody > tr:nth-child(odd) > th {\n  background-color: #d0f8ce;\n}\n.table-hover.table-mc-green > tbody > tr:hover > td,\n.table-hover.table-mc-green > tbody > tr:hover > th {\n  background-color: #a3e9a4;\n}\n@media screen and (max-width: 767px) {\n  .table-responsive-vertical .table-striped.table-mc-green > tbody > tr > td,\n  .table-responsive-vertical .table-striped.table-mc-green > tbody > tr:nth-child(odd) {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-striped.table-mc-green > tbody > tr > td:nth-child(odd) {\n    background-color: #d0f8ce;\n  }\n  .table-responsive-vertical .table-hover.table-mc-green > tbody > tr:hover > td,\n  .table-responsive-vertical .table-hover.table-mc-green > tbody > tr:hover {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-hover.table-mc-green > tbody > tr > td:hover {\n    background-color: #a3e9a4;\n  }\n}\n.table-striped.table-mc-light-green > tbody > tr:nth-child(odd) > td,\n.table-striped.table-mc-light-green > tbody > tr:nth-child(odd) > th {\n  background-color: #f1f8e9;\n}\n.table-hover.table-mc-light-green > tbody > tr:hover > td,\n.table-hover.table-mc-light-green > tbody > tr:hover > th {\n  background-color: #dcedc8;\n}\n@media screen and (max-width: 767px) {\n  .table-responsive-vertical .table-striped.table-mc-light-green > tbody > tr > td,\n  .table-responsive-vertical .table-striped.table-mc-light-green > tbody > tr:nth-child(odd) {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-striped.table-mc-light-green > tbody > tr > td:nth-child(odd) {\n    background-color: #f1f8e9;\n  }\n  .table-responsive-vertical .table-hover.table-mc-light-green > tbody > tr:hover > td,\n  .table-responsive-vertical .table-hover.table-mc-light-green > tbody > tr:hover {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-hover.table-mc-light-green > tbody > tr > td:hover {\n    background-color: #dcedc8;\n  }\n}\n.table-striped.table-mc-lime > tbody > tr:nth-child(odd) > td,\n.table-striped.table-mc-lime > tbody > tr:nth-child(odd) > th {\n  background-color: #f9fbe7;\n}\n.table-hover.table-mc-lime > tbody > tr:hover > td,\n.table-hover.table-mc-lime > tbody > tr:hover > th {\n  background-color: #f0f4c3;\n}\n@media screen and (max-width: 767px) {\n  .table-responsive-vertical .table-striped.table-mc-lime > tbody > tr > td,\n  .table-responsive-vertical .table-striped.table-mc-lime > tbody > tr:nth-child(odd) {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-striped.table-mc-lime > tbody > tr > td:nth-child(odd) {\n    background-color: #f9fbe7;\n  }\n  .table-responsive-vertical .table-hover.table-mc-lime > tbody > tr:hover > td,\n  .table-responsive-vertical .table-hover.table-mc-lime > tbody > tr:hover {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-hover.table-mc-lime > tbody > tr > td:hover {\n    background-color: #f0f4c3;\n  }\n}\n.table-striped.table-mc-yellow > tbody > tr:nth-child(odd) > td,\n.table-striped.table-mc-yellow > tbody > tr:nth-child(odd) > th {\n  background-color: #fffde7;\n}\n.table-hover.table-mc-yellow > tbody > tr:hover > td,\n.table-hover.table-mc-yellow > tbody > tr:hover > th {\n  background-color: #fff9c4;\n}\n@media screen and (max-width: 767px) {\n  .table-responsive-vertical .table-striped.table-mc-yellow > tbody > tr > td,\n  .table-responsive-vertical .table-striped.table-mc-yellow > tbody > tr:nth-child(odd) {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-striped.table-mc-yellow > tbody > tr > td:nth-child(odd) {\n    background-color: #fffde7;\n  }\n  .table-responsive-vertical .table-hover.table-mc-yellow > tbody > tr:hover > td,\n  .table-responsive-vertical .table-hover.table-mc-yellow > tbody > tr:hover {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-hover.table-mc-yellow > tbody > tr > td:hover {\n    background-color: #fff9c4;\n  }\n}\n.table-striped.table-mc-amber > tbody > tr:nth-child(odd) > td,\n.table-striped.table-mc-amber > tbody > tr:nth-child(odd) > th {\n  background-color: #fff8e1;\n}\n.table-hover.table-mc-amber > tbody > tr:hover > td,\n.table-hover.table-mc-amber > tbody > tr:hover > th {\n  background-color: #ffecb3;\n}\n@media screen and (max-width: 767px) {\n  .table-responsive-vertical .table-striped.table-mc-amber > tbody > tr > td,\n  .table-responsive-vertical .table-striped.table-mc-amber > tbody > tr:nth-child(odd) {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-striped.table-mc-amber > tbody > tr > td:nth-child(odd) {\n    background-color: #fff8e1;\n  }\n  .table-responsive-vertical .table-hover.table-mc-amber > tbody > tr:hover > td,\n  .table-responsive-vertical .table-hover.table-mc-amber > tbody > tr:hover {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-hover.table-mc-amber > tbody > tr > td:hover {\n    background-color: #ffecb3;\n  }\n}\n.table-striped.table-mc-orange > tbody > tr:nth-child(odd) > td,\n.table-striped.table-mc-orange > tbody > tr:nth-child(odd) > th {\n  background-color: #fff3e0;\n}\n.table-hover.table-mc-orange > tbody > tr:hover > td,\n.table-hover.table-mc-orange > tbody > tr:hover > th {\n  background-color: #ffe0b2;\n}\n@media screen and (max-width: 767px) {\n  .table-responsive-vertical .table-striped.table-mc-orange > tbody > tr > td,\n  .table-responsive-vertical .table-striped.table-mc-orange > tbody > tr:nth-child(odd) {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-striped.table-mc-orange > tbody > tr > td:nth-child(odd) {\n    background-color: #fff3e0;\n  }\n  .table-responsive-vertical .table-hover.table-mc-orange > tbody > tr:hover > td,\n  .table-responsive-vertical .table-hover.table-mc-orange > tbody > tr:hover {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-hover.table-mc-orange > tbody > tr > td:hover {\n    background-color: #ffe0b2;\n  }\n}\n.table-striped.table-mc-deep-orange > tbody > tr:nth-child(odd) > td,\n.table-striped.table-mc-deep-orange > tbody > tr:nth-child(odd) > th {\n  background-color: #fbe9e7;\n}\n.table-hover.table-mc-deep-orange > tbody > tr:hover > td,\n.table-hover.table-mc-deep-orange > tbody > tr:hover > th {\n  background-color: #ffccbc;\n}\n@media screen and (max-width: 767px) {\n  .table-responsive-vertical .table-striped.table-mc-deep-orange > tbody > tr > td,\n  .table-responsive-vertical .table-striped.table-mc-deep-orange > tbody > tr:nth-child(odd) {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-striped.table-mc-deep-orange > tbody > tr > td:nth-child(odd) {\n    background-color: #fbe9e7;\n  }\n  .table-responsive-vertical .table-hover.table-mc-deep-orange > tbody > tr:hover > td,\n  .table-responsive-vertical .table-hover.table-mc-deep-orange > tbody > tr:hover {\n    background-color: #fff;\n  }\n  .table-responsive-vertical .table-hover.table-mc-deep-orange > tbody > tr > td:hover {\n    background-color: #ffccbc;\n  }\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 671:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(159)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 673:
/***/ (function(module, exports) {

module.exports = "<md-toolbar class=\"toolbar\">Rechnungstool</md-toolbar>\n\n<div id=\"leftContainer\">\n  <md-card>\n    <md-card-title-group>\n      <md-card-title>Fahrten</md-card-title>\n      <md-card-subtitle>Rechnungsnummer: {{billService.bill._id}}</md-card-subtitle>\n    </md-card-title-group>\n    <md-card-content>\n      <table id=\"table\" class=\"table table-hover table-striped table-mc-light-green\">\n        <thead>\n          <tr>\n            <th>Datum</th>\n            <th>Abholungsort</th>\n            <th>Abgabeort</th>\n            <th>Typ</th>\n            <th>Fahrgestellnr.</th>\n            <th>Betrag</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let journey of billService.journeys; let i = index\">\n            <td>{{journey?.date | date:'dd.MM.yy'}}</td>\n            <td>{{journey?.start}}</td>\n            <td>{{journey?.end}}</td>\n            <td>{{journey?.type}}</td>\n            <td>{{journey?.number}}</td>\n            <td>{{journey?.amount}} €</td>\n            <td>\n              <button (click)=\"billService.editJourney(journey, i)\">Ändern</button>\n              <button (click)=\"billService.deleteJourney(journey)\">Löschen</button>\n            </td>\n          </tr>\n      </table>\n    </md-card-content>\n    <md-card-actions fxLayout fxLayoutAlign=\"center center\">\n      <button md-button (click)=\"billService.newBill()\">Neue Rechnung</button>\n    </md-card-actions>\n  </md-card>\n</div>\n\n<div id=\"rightContainer\">\n  <md-card id=\"leftEingabe\">\n    <md-card-title-group>\n      <md-card-title *ngIf=\"!billService.edit\">Fahrt hinzufügen</md-card-title>\n      <md-card-title *ngIf=\"billService.edit\">Fahrt Editieren</md-card-title>\n    </md-card-title-group>\n    <md-card-content *ngIf=\"billService.journey\">\n      <md-input-container>\n        <input type=\"date\" mdInput placeholder=\"Datum\" [(ngModel)]=\"billService.journey.date\">\n      </md-input-container><br>\n      <md-input-container>\n        <input mdInput placeholder=\"Start\" [(ngModel)]=\"billService.journey.start\">\n      </md-input-container>\n      <md-input-container fxflex>\n        <input mdInput placeholder=\"Abgabe\" [(ngModel)]=\"billService.journey.end\">\n      </md-input-container> <br>\n      <md-input-container fxflex>\n        <input mdInput placeholder=\"Typ\" [(ngModel)]=\"billService.journey.type\">\n      </md-input-container>\n      <md-input-container fxflex>\n        <input mdInput placeholder=\"Fahrgestell\"  [(ngModel)]=\"billService.journey.number\">\n      </md-input-container>\n      <md-input-container fxflex>\n        <input type=\"number\" mdInput placeholder=\"Betrag\" [(ngModel)]=\"billService.journey.amount\">\n      </md-input-container>\n    </md-card-content>\n    <md-card-actions *ngIf=\"!billService.edit\" fxLayout fxLayoutAlign=\"center center\">\n      <button md-button (click)=\"billService.saveJourney()\">Hinzufügen</button>\n      <button md-button (click)=\"billService.newJourney()\">Abbrechen</button>\n    </md-card-actions>\n    <md-card-actions *ngIf=\"billService.edit\" fxLayout fxLayoutAlign=\"center center\">\n      <button md-button (click)=\"billService.saveJourney()\">Ändern</button>\n      <button md-button (click)=\"billService.newJourney()\">Abbrechen</button>\n    </md-card-actions>\n  </md-card>\n\n  <md-card id=\"rightEingabe\">\n    <md-card-title-group>\n      <md-card-title>Rechnungsdaten</md-card-title>\n\n    </md-card-title-group>\n    <md-card-content>\n      Rechnungsnummer: {{billService.bill.reNr}}\n      <app-customer-editor ></app-customer-editor>\n      \n    </md-card-content>\n  </md-card>\n</div>\n\n<md-list>\n  <h3 md-subheader>Rechnungen</h3>\n  <md-list-item *ngFor=\"let bill of billService.bills\">\n    <md-icon md-list-avatar (click)=\"billChooser(bill.doc)\">folder</md-icon>\n    <h4 md-line (click)=\"billChooser(bill.doc)\">{{bill.doc._id | date:'dd.MM.yy'}}</h4>\n    <br> <button md-raised-button (click)=\"billService.deleteBill(bill.doc)\">Entfernen</button>\n\n  </md-list-item>\n\n</md-list>"

/***/ }),

/***/ 674:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"billService.customers.length > 0\" >\n  <h4>Empfänger</h4><br> \n  {{billService.bill.customer?.name}}<br> \n  {{billService.bill.customer?.address?.street}}<br> \n  {{billService.bill.customer?.address?.zip}}<br> \n  {{billService.bill.customer?.address?.city}}\n  <button md-button (click)=\"billService.gotoCustomer(-1)\">Vorheriger</button>\n  <button md-button (click)=\"billService.gotoCustomer(1)\">Nächster</button>\n  <button md-button (click)=\"billService.gotoCustomer(0)\">Hinzufügen</button>\n\n</div><br>\n<div *ngIf=\"billService.editModeCustomer || billService.addModeCustomer\">\n  <h4 *ngIf=\"billService.addModeCustomer\"> Eingabe neuer Empfänger</h4>\n  <h4 *ngIf=\"billService.editModeCustomer\"> Empfängerdaten ändern</h4>\n  <md-input-container fxflex>\n    <input mdInput placeholder=\"Name\" [(ngModel)]=\"billService.customer.name\">\n  </md-input-container>\n  <md-input-container fxflex>\n    <input mdInput placeholder=\"Straße\" [(ngModel)]=\"billService.customer.address.street\">\n  </md-input-container>\n  <md-input-container fxflex>\n    <input mdInput placeholder=\"Postleitzahl\" [(ngModel)]=\"billService.customer.address.zip\">\n  </md-input-container>\n  <md-input-container fxflex>\n    <input mdInput placeholder=\"Stadt\" [(ngModel)]=\"billService.customer.address.city\">\n  </md-input-container>\n  <button *ngIf=\"!editModeCustomer\" md-button (click)=\"billService.saveCustomer()\">Hinzufügen</button>\n  <button *ngIf=\"editModeCustomer\" md-button (click)=\"billService.saveCustomer()\">Ändern</button>\n  <button md-button (click)=\"billService.newJourney()\">Abbrechen</button>\n</div>"

/***/ }),

/***/ 936:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(463);


/***/ })

},[936]);
//# sourceMappingURL=main.bundle.js.map
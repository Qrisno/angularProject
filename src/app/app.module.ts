import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormComponent} from './form/form.component';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CurrencyComponent } from './currency/currency.component';

import { EmployeeRegisterComponent } from './http/employ-register/employ-register.component';
import { EmployeeComponent } from './http/employ/employ.component';
import { AllEmpsComponent } from './http/all-emps/all-emps.component';



@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    CurrencyComponent,
    EmployeeRegisterComponent,
    EmployeeComponent,
    AllEmpsComponent
 
  ],
  imports: [
    
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
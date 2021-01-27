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
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component'
import { routes } from './routes';
import { WelcomeComponent } from './welcome/welcome.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    CurrencyComponent,
    EmployeeRegisterComponent,
    EmployeeComponent,
    AllEmpsComponent,
    LoginComponent,
    NavbarComponent,
    WelcomeComponent,
    UsersComponent
 
  ],
  imports: [
  
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
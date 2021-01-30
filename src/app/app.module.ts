import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InterceptorService } from './loader/interceptor.service';

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
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    
  ],
  providers: [
    AuthGuard,
    {provide:HTTP_INTERCEPTORS, useClass:InterceptorService, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
import { Routes } from '@angular/router'
import { AuthGuard } from './auth-guard.service'
import { CurrencyComponent } from './currency/currency.component'
import { FormComponent } from './form/form.component'
import { AllEmpsComponent } from './http/all-emps/all-emps.component'
import { EmployeeRegisterComponent } from './http/employ-register/employ-register.component'
import { EmployeeComponent } from './http/employ/employ.component'
import { LoginComponent } from './login/login.component'
import { UsersComponent } from './users/users.component'
import { WelcomeComponent } from './welcome/welcome.component'
export const routes:Routes = [
    {path:'', component:WelcomeComponent },
    {path:'register', component:EmployeeRegisterComponent },
    {path:'employee', component:EmployeeComponent},
    {path:'employeeChart', component:AllEmpsComponent},
    {path:'form', component:FormComponent},
    {path:'currency', component:CurrencyComponent},
    {path:'login', component:LoginComponent},
    {path:'users', component:UsersComponent, canActivate:[AuthGuard]   },
]

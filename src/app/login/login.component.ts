import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as EventEmitter from 'events';
import { EmployeeService } from '../employee-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user!:any;
  form!:FormGroup;
  loggedIn:boolean=false;
  constructor(private fb:FormBuilder, private server:EmployeeService, private rout:Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: new FormControl("", [Validators.required, Validators.email]),
          password: new FormControl("", [
            Validators.required,
          ]),
    });
  }
 
  onSubmit(){
    
    this.server.get().subscribe((data)=>{
      for(let i of data){
        
        if(i.email==this.form.value.email && i.passGroup.password==this.form.value.password){
          this.server.user=this.form.value.email;
          
          this.server.log = true;
          
          this.rout.navigate(['users']);
          break;
          
        }else{
         
          this.server.log = false;
        }
        
      }
      
    });
   
    
  }
  }




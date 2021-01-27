import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
 log!:boolean;
  constructor(private server:EmployeeService) {
    
   }

  ngOnInit(): void {
    
   
  }
  ngDoCheck(){
    this.log = this.server.log;
 
  }
  logOut(){
    this.server.log=false;

  }
 

}

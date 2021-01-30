import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee-service.service';
import { state, trigger, style, transition, animate } from '@angular/animations';
import { LoaderService } from '../loader/loader.service';
import { async } from 'rxjs';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('loader', [
      state('start', style({
        visibility: 'hidden',
        height: '5px',
        width: '0px',
        backgroundColor: '#111',
        transform: 'translateX(0)'
      })),
      state('end', style({
        visibility: 'visible',
        height: '5px',
        width: '100%',
        backgroundColor: '#111',
        transform: 'translateX(100%)'
      })),
      transition('start => end', animate(1000)),
      transition('end => start', animate(1200)),
      
    ])
  ]
})
export class NavbarComponent implements OnInit {
 log!:boolean;
 cool:any='start';
  constructor(private server:EmployeeService, private loaderService:LoaderService) {
    
    this.loaderService.isLoaded.pipe(
      tap((data)=>{
        if(data){
          this.cool='end'
        }else{
          this.cool='start'
        }
      })
    ).subscribe();
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

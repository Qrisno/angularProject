import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/employee-service.service';
import { catchError,delay,tap} from 'rxjs/operators';
import { of } from 'rxjs';
import { state, trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-employee',
  templateUrl: './employ.component.html',
  styleUrls: ['./employ.component.scss'],
  animations:[
    trigger('delete',[
      state('start',style({
        opacity:'0',
        height: '0px',
        width: '0px',
        transform: 'translateY(0px)'
        
      })),
      state('end',style({
        position:'absolute',
        height: '100px',
        width: '500px',
        borderRadius:'5px',
        transform: 'translateX(440px)',
        opacity:'1',
       
        
      }
        
      )),
      transition('start => end', animate(1000))
    ]),
   
  ]
  
})
export class EmployeeComponent implements OnInit {
  employee!: FormGroup;
  name!: string;
  salary! : number;
  age!: number;
  del!:boolean;

  dePop:any='start';
  info: boolean = false;
  checker: boolean = false;
  constructor(private fb: FormBuilder, private http:HttpClient, private EmpService: EmployeeService) {
    
  }
  
  ngOnInit() {
    this.employee = this.fb.group({
      id: ['', Validators.required],
      name : [''],
      salary: [''],
      age: ['']
    })
  }
  ErrorHandler(err: { message: any; }){
    alert(`${err.message}`);
    this.employee.reset();
    this.checker = false;
    this.info = false;
  }
  getEmp(){
    this.EmpService.getEmp(this.employee.controls.id.value)
    .pipe(
      tap((employee:any)=>{
        this.info = true;
        this.name = employee['name'];
        this.age = employee['age'];
        this.salary = employee['salary'];
        
      }),
      catchError(err => {
        this.ErrorHandler(err);
        return of([err]);
      })
    ).subscribe()
  }
  Updated(){
    this.checker= true;
    this.info = false;
    this.EmpService.getEmp(this.employee.controls.id.value)
    .pipe(
      delay(1000),
      tap((value:any)=>{
        return this.employee.patchValue(value);
      }),
      catchError(err => {
        this.ErrorHandler(err);
        return of([err]);
      })
      
    ).subscribe();
  }
  hide(){
    this.checker=false;
    this.employee.reset();
  }
  updateEmp(){
   
    this.EmpService.update(this.employee.controls.id.value, this.employee.getRawValue())
    .pipe(
      tap( () => {
       
        this.employee.reset();
        this.checker = false;
        this.info = false;
        
      }),
      catchError(err => {
        this.ErrorHandler(err);
        return of([err]);
      })
    ).subscribe();
  }
  removeEmp(){
    this.dePop='end';
   
    if(this.del===true){
      
      this.EmpService.delete(this.employee.controls.id.value)
      .pipe(
        delay(2000),
        catchError(e=> {
          this.ErrorHandler(e);
          return of([e]);
        })
      )
      .subscribe();
      this.employee.reset();
      this.del=false;
    }
    
   
  }//
  yes(){
   
    this.dePop='start';
    this.del=true;
    this.removeEmp();
    this.dePop='start';
    
  }
  no(){
    this.dePop='start';
    this.del=false;
  }
  
}
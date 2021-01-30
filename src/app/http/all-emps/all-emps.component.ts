import { Component, OnInit } from '@angular/core';
import { delay, map, tap } from 'rxjs/operators';
import { EmployeeService, EmpStructure } from '../../employee-service.service';



@Component({
  selector: 'app-all-emps',
  templateUrl: './all-emps.component.html',
  styleUrls: ['./all-emps.component.scss'],
 
  
})
export class AllEmpsComponent implements OnInit {
  sec:number=2000;
  pages = new Array<number>(1);
  empList: EmpStructure[] = [];
  empsOnPage : EmpStructure[] = [];
  buttons!: number;
  constructor(private http: EmployeeService) {
    
  }
  
  ngOnInit() {
    
    this.http._EmpStructures
    .subscribe(()=>{
      this.all();
     
    })
    this.all();
  }
  
  all(){
    
    this.http.get()
    .pipe(
      delay(2000),
      tap((value)=>{
        
        if(value.length > 4){
          this.pages = new Array<number>(Math.floor(value.length/4) +1);
        }

      }),
      map((emps)=>{
        
        this.empList = [...emps];
        this.empsOnPage = emps.slice(0,4);
      })
    )
    .subscribe()
  }
  changePage(n:number){
   
    this.empsOnPage = this.empList.slice(4*n, 4*n+4);
  }
}

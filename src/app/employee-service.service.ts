import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface EmpStructure{
  name: string,
  salary: number,
  age: number,
  id:number,
  profile_image?: string,
  email?: number,
  passGroup?:any;
  password?:any;
}
export interface userStructure{
  nickname: string,
  number: number,
  email: number,
  id:number,
  password:any;
  web:any;
  
}
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  coola:any='start';
  loaded:boolean=true;
  log!:boolean ;
  user!:any;
  private url:string = `http://localhost:3000/`;
  public _EmpStructures = new Subject<EmpStructure[]|userStructure[]>();

  constructor(private http: HttpClient) {
  }
  
  get(){
    this.loaded=true;
    return this.http.get<EmpStructure[]|userStructure[]>(this.url + 'employee');
  }
  create(employee : EmpStructure|userStructure ){
    return this.http.post<EmpStructure|userStructure>(this.url + 'employee', employee)
    .pipe(

      tap(()=>{
        
        return this._EmpStructures.next()
      })
    )
    .subscribe();
  }
  delete(id:number): Observable<EmpStructure|userStructure>{
    return this.http.delete<EmpStructure|userStructure>(this.url + 'employee/' + id)
    .pipe(
     
      tap(()=>this._EmpStructures.next()),
    )
  }
  getEmp(id: number): Observable<EmpStructure|userStructure>{
    return this.http.get<EmpStructure|userStructure>(this.url + 'employee/' + id);
  }
  update(id: number, employee:EmpStructure|userStructure): Observable<EmpStructure|userStructure>{
    return this.http.put<EmpStructure|userStructure>(this.url + 'employee/' + id,employee)
    .pipe(
      
      tap(()=>this._EmpStructures.next())
    );
  }
  
}
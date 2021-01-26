import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface EmpStructure{
  name: string,
  salary: number,
  age: number,
  id:number,
  profile_image?: string
}
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url:string = `http://localhost:3000/`;
  public _EmpStructures = new Subject<EmpStructure[]>();

  constructor(private http: HttpClient) {
  }
  get(){
    return this.http.get<EmpStructure[]>(this.url + 'employee')
  }
  create(employee : EmpStructure ){
    return this.http.post<EmpStructure>(this.url + 'employee', employee)
    .pipe(
      tap(()=>this._EmpStructures.next())
    )
    .subscribe();
  }
  delete(id:number): Observable<EmpStructure>{
    return this.http.delete<EmpStructure>(this.url + 'employee/' + id)
    .pipe(
      tap(()=>this._EmpStructures.next())
    )
  }
  getEmp(id: number): Observable<EmpStructure>{
    return this.http.get<EmpStructure>(this.url + 'employee/' + id);
  }
  update(id: number, employee:EmpStructure): Observable<EmpStructure>{
    return this.http.put<EmpStructure>(this.url + 'employee/' + id,employee)
    .pipe(
      tap(()=>this._EmpStructures.next())
    );
  }
  
}
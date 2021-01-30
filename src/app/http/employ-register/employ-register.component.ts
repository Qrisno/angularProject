import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/employee-service.service';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employ-register.component.html',
  styleUrls: ['./employ-register.component.scss'],
 
})
export class EmployeeRegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private EmpService: EmployeeService) { 
    
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      salary: ['',Validators.required],
      age: ['',Validators.required]
    })
  }

  add(){
    
    this.EmpService.create(this.form.getRawValue());
    this.form.reset();
    
  }
}
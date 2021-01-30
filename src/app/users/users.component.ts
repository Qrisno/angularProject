import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { EmployeeService } from '../employee-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  empList:any;
  editClick!: boolean;
  num!: number;
  form!:FormGroup;
  constructor(private http:EmployeeService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.http._EmpStructures
    .subscribe(()=>{
      this.all();
    })
    this.all();
    this.form = this.fb.group({
      id:new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      passGroup: new FormGroup(
        {
          password: new FormControl("", [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern("^[A-Za-z0-9]+$")
          ]),
          confPassword: new FormControl("", [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern("^[A-Za-z0-9]+$")
          ])
        },
        {
          validators: <ValidatorFn>this.checkPass,
        }
      ),
      nickname: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9^-_. +]+$")
      ]),
      phoneNum: new FormControl("", [
        Validators.required,
        Validators.pattern('^((\\+380-?))?[0-9]{9}$')
        
      ]),
      web: new FormControl("", [
        Validators.required,
        Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')
        
      ]),
      terms: new FormControl("", [
        Validators.required,
        Validators.requiredTrue
        
      ]),
      
    });
  }
  all(){
    this.http.get()
    .pipe(
      map((emps)=>{
        this.empList = [...emps];
        console.log(this.empList)
      })
    )
    .subscribe()
  }
  checkPass(fGroup: FormGroup): ValidationErrors|null {
    if (fGroup.get("password")?.value !== fGroup.get("confPassword")?.value) {
      return {'call': true};
    }else{
      return null;
    }
    
  }
  checkUser(i:any){
    
    if(this.empList[i].email==this.http.user){
      return false;
    }else if(this.empList[i].email==this.http.user.email){
      return false;
    }
    
   
    return true;
  }
  edit(i: number) {
    this.form.patchValue({
      id:this.empList[i].id,
      email: this.empList[i].email,
      passGroup: {
        password: this.empList[i]['passGroup'].password,
        confPassword: this.empList[i]['passGroup'].confPassword
      },
      nickname: this.empList[i]['nickname'],
      phoneNum: this.empList[i]['phoneNum'],
      web: this.empList[i]['web'],
      terms: true
    });
    this.editClick = true;
    this.num = i;
  }
  delete(i:number){
    let valid = confirm(`This action will remove an user with the email:${this.empList[i].email}, Are u sure?`);
    if(valid){
      console.log(this.empList);
      this.http.delete(this.empList[i].id).subscribe();
      
    }
   
  }
  submit(){
    
    if (this.form.valid) {
      if (this.editClick === true) {
        this.empList.splice(this.num, 1, this.form.value);
        this.http.user= this.form.value;
        this.http.update(this.empList[this.num].id,this.form.getRawValue()).subscribe();
      } 
  }
  this.cancel();
}
cancel(){
  this.editClick=false;
}
}

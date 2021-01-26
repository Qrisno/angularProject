import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  users:Array<any> = [];
  editClick:boolean = false;
  num!: number;
  constructor(private fb:FormBuilder) {
  }
  
  onSubmit() {

      if (this.form.valid) {
      if (this.editClick === true) {
        this.users.splice(this.num, 1, this.form.value);
      } else {
        this.users.push(this.form.value);
      }
    }
    this.form.reset();
    this.editClick = false;

  }
  ngOnInit() {
    this.form = this.fb.group({
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
          validators: this.checkPass,
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
  checkPass(fGroup: FormGroup): ValidationErrors {
    if (fGroup.get("password").value !== fGroup.get("confPassword").value) {
      return {'call': true};
    }else{
      return null;
    }
    
  }
  edit(i: number) {
    this.form.patchValue({
      email: this.users[i]['email'],
      passGroup: {
        password: this.users[i]['passGroup'].password,
        confPassword: this.users[i]['passGroup'].confPassword
      },
      nickname: this.users[i]['nickname'],
      phoneNum: this.users[i]['phoneNum'],
      web: this.users[i]['web'],
      terms: true
    });
    this.editClick = true;
    this.num = i;
  }
  delete(i:number){
    let valid = confirm(`This action will remove an user with the email:${this.users[i].email}, Are u sure?`);
    if(valid){
      this.users.splice(i,1);
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnChanges } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent {
  option1: string = 'USD';
  option2: string = 'EUR';
  firstValue: any;
  secondValue: any;
  currenciesArr= new FormArray([]);
  totalSum: number=0;
  control:any;
  bool!: boolean;


  constructor(private httpClient: HttpClient) { }

  currency(val1: string,val2: string) {
    return this.httpClient.get(`https://api.exchangeratesapi.io/latest?base=${val1}&symbols=${val2}`)
  }
  shoot(): void {
    this.currency(this.option1,this.option2)
    .subscribe((rate: any) => {
      
      if(this.firstValue===null){
        this.secondValue=null
      }else{
        this.secondValue =  (this.firstValue * rate['rates'][`${this.option2}`]).toFixed(2);
      }
    })
    
  }
  shootBack(): void {
    this.currency(this.option2,this.option1)
    .subscribe((rate: any) => {
      
      if(this.secondValue===null){
        this.firstValue=null
      }else{
        
        this.firstValue = (this.secondValue * rate['rates'][`${this.option1}`]).toFixed(2);
      }
    })
    
  }
 dis(){
    return this.bool;
  }
  click(i:any, b:any, c:any){
    let cur = this.currency(b,c);
    cur.subscribe(
      (b:any)=>{
        let value:number =parseFloat((parseInt(i)*b.rates[c]).toFixed(2));
        if(isNaN(value)){
          value=0;
        }
        this.control = new FormControl({
          val: value
        })
        let index = this.currenciesArr.controls.indexOf(this.control);
        if(value !==0 ){
          this.currenciesArr.push(this.control);
          this.totalSum+=value;
          this.bool=true;
          this.secondValue=this.totalSum;
        }
       
        console.log(typeof value);
        
        console.log(this.totalSum);
      }
      
    )
    console.log(this.currenciesArr);
    
  }
  
}
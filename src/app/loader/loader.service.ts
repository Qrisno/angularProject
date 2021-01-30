import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public isLoaded:BehaviorSubject<boolean> =new BehaviorSubject<boolean>(false);
  constructor() { }
}

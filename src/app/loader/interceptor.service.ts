import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, finalize, tap } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private loaderService:LoaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.isLoaded.next(true);
    return this.handler(next,req);
  }
  handler(next:any,request:any){
    return next.handle(request).pipe(
     
      tap(
        (event)=>{
          if(event instanceof HttpRequest){
            this.loaderService.isLoaded.next(true);
          }else if(event instanceof HttpResponse){
            this.loaderService.isLoaded.next(false);
          }
        }
      )
    )
  }
}

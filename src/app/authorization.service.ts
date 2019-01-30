import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpEvent, HttpHandler} from '@angular/common/http';
import {Observable} from "rxjs";


@Injectable()
export class AuthorizationService implements HttpInterceptor {

  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>
  {
    //read token form local storage
    const idToken=localStorage.getItem('idToken');
    //if token found clone it to request object at header
    if(idToken)
    {
      
      
      const cloned=req.clone({headers:req.headers.set("Authorization","Bearer "+idToken)});
      return next.handle(cloned);
      
    }
    else{
      return next.handle(req);
    }
  }
  
}

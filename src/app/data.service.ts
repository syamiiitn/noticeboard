import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    obj3:object[]=[];
    notif:object[]=[];
    res:object[]=[];
  constructor(private http:HttpClient,router:Router) { }
  receiveData(v)
  {
    this.obj3=v;
    console.log(this.obj3)
  }

  
  getData1():Observable<any>
  {
    return this.http.get<any>("assets/studentregistrationform.json");
  }
  receiven(v)
  {
    this.notif=v;
  }
  sendn()
  {
    return this.notif;
  }

  receiver(v)
  {
    this.res=v;
  }
  sendr()
  {
    return this.res;
  }
}

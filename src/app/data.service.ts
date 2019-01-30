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
  constructor(private http:HttpClient, private router:Router) { }
  //post method of registration
  receiveFromReg(v)
  {
    this.http.post('api/home/register',v).subscribe(temp=>{alert(temp);if(temp==='registered successfully')
  {
    this.router.navigate(['home/login']);
  }
  if(temp==='user name already existed. choose another name.')
  {
    this.router.navigate(['home/register']);
  }
  })
  }

  //post method of login
  receiveFromLogin(v)
  {
    this.http.post('api/home/login',v).subscribe(temp=>
      {
        localStorage.setItem('idToken',temp['idToken'])
        if(temp['info']=="login success as admin") {
          alert(temp['info']);
          this.router.navigate(['admin']);
        }
        if(temp['info']=="login success as student") {
          alert(temp['info']);
          this.router.navigate(['student']);
        }
      })
  }
}

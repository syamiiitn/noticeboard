import { Component, OnInit } from '@angular/core';

import { RegisterService } from '../register.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  arr:object[]=[];
  firstname:any;
  middlename:any;
  lastname:any;
  email:any;
  userid:any;
  password:any;
  dob:any;
  branch:any;
  gender:any;
  category:any;
  constructor(private rs:RegisterService,private http:HttpClient,private router:Router) {}
  add(v)
  {
    this.arr=v;
    console.log(v);
    this.rs.receivefromreg(v);
    this.http.post('register',v).subscribe(temp=>{alert(temp);
    if(temp==="registered successfully")
  {
    this.router.navigate(['home/login'])
  }
if(temp==="userid existed.. choose another userid..")
{
  this.router.navigate(['home/register'])
}})
  }

}

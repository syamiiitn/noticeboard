import { Component, OnInit } from '@angular/core';

import { RegisterService } from '../register.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

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
  constructor(private ds:DataService,private http:HttpClient,private router:Router) {}
  add(v)
  {
    this.ds.receiveFromReg(v);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  constructor(private router:Router,private http:HttpClient, private ds:DataService) {}
  userid:any;
  password:any;
ngOnInit()
{
}
sign(v)
{
//old login code
//   if(v.userid=="admin")
//   {
//     this.router.navigate(["admin"])
//   }
//   else{
//     this.router.navigate(["student"])
//   }
// }

//console.log(v);
this.ds.receiveFromLogin(v);
}
}
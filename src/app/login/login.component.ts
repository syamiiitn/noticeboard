import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  constructor(private router:Router,private http:HttpClient) {}
ngOnInit()
{
}
sign(v)
{
//   if(v.userid=="admin")
//   {
//     this.router.navigate(["admin"])
//   }
//   else{
//     this.router.navigate(["student"])
//   }
// }

this.http.post('home/login',v).subscribe(temp=>{
  alert(temp);
  if(temp=="login success as admin"){
    this.router.navigate(['admin']);
  }
  if(temp=="login success as student"){
    this.router.navigate(['student']);
  }
})



}
}
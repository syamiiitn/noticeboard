import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.css']
})
export class StudentprofileComponent implements OnInit {

  data1:any=[];
  data2:any={};
  firstname:any;
  middlename:any;
  lastname:any;
  email:any;
  userid:any;
  dob:any;
  branch:any;
  gender:any;
  category:any;
  constructor(private http:HttpClient, private profileService:ProfileService, private router:Router) { }

  ngOnInit() {
    this.profileService.getStudentProfile().subscribe(temp=>{
      if(temp['message']=='token is not valid')
      {
        alert(temp['message'])
        this.router.navigate(['home/login'])
      }
      else
      {
        this.data1=temp;
      }
      })
}
update(i)
  {
    this.data2=i;
    
  }
  add()
  {
    this.profileService.editStudentProfile(this.data2);
  }
}

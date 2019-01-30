import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent implements OnInit {
  data:any=[];
  data2:any={};
  firstname:any;
  middlename:any;
  lastname:any;
  email:any;
  userid:any;
  dob:any;
  gender:any;
  category:any;
  constructor(private http:HttpClient, private profileService:ProfileService,private route:Router) { }

  ngOnInit() 
    {
    this.profileService.getAdminProfile().subscribe(temp=>{
      if(temp['message']=='token is not valid')
      {
        this.route.navigate(['home/login'])
      }
      else
      {
        this.data=temp;
      }
    });
    }
    
  update(i)
  {
    this.data2=i;
    
  }
  add()
  {
    this.profileService.editAdminProfile(this.data2);
  }

}

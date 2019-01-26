import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent implements OnInit {
  data:any={};
  data2:any={};
  firstname:any;
  middlename:any;
  lastname:any;
  email:any;
  userid:any;
  dob:any;
  gender:any;
  category:any;
  constructor(private ds:DataService,private http:HttpClient) { }

  ngOnInit() {
    console.log(this.data);this.http.get<any>('admin/adminprofile').subscribe(temp=>{
      this.data=temp;
    })
    
  }
  update(i)
  {
    this.data2=i;
    
  }
  add()
  {
    this.http.put('admin/adminprofile',this.data2).subscribe();
  }

}

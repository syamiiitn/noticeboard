import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css']
})
export class AdminprofileComponent implements OnInit {
  data:object[]=[];
  constructor(private ds:DataService,private http:HttpClient) { }

  ngOnInit() {
    console.log(this.data);this.http.get<any>('admin/adminprofile').subscribe(temp=>{
      this.data=temp;
    })
    
  }

}

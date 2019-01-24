import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.css']
})
export class StudentprofileComponent implements OnInit {

  data1:object[]=[];
  constructor(private ds:DataService,private http:HttpClient) { }

  ngOnInit() {
    //this.ds.getData1().subscribe(temp=>{this.data1=temp;})
    console.log(this.data1);this.http.get<any>('student/studentprofile').subscribe(temp=>{
      this.data1=temp;
  })
}

}

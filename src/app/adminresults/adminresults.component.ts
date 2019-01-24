import { Component, OnInit, DoCheck } from '@angular/core';
import { DataService } from '../data.service';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adminresults',
  templateUrl: './adminresults.component.html',
  styleUrls: ['./adminresults.component.css']
})


export class AdminresultsComponent implements DoCheck  {
  p:number;
  arr:object[]=[];
  arr2:object[]=[];
  arr3:object[]=[];
  sname:string;
  english:string;
  physics:string;
  chemistry:string;
  enggdrawing:string;
  maths:string;
  constructor(private ds:DataService, private http:HttpClient){

  }
  ngDoCheck()
  {
    this.http.get<any>('admin/adminresults').subscribe(temp=>{
      this.arr=temp;
    })
  }
  addData(v)
  {
   // this.arr.push(v);
   this.http.post<any>('admin/adminresults',v).subscribe(temp=>{
    this.arr=temp;
  })
    this.sname='';
    this.english='';
    this.physics='';
    this.chemistry='';
    this.enggdrawing='';
    this.maths='';
    console.log(this.arr);
  }
  delete(v)
    {
this.arr.splice(v,1);
    }
    edit(y)
    {
      this.arr2=y;
    }
    send(y)
    {
        this.arr3.push(y);
        this.ds.receiveData(y);
        this.ds.receiver(this.arr3);
    }
    save(v)
    {

    }

}
import { Component, OnInit, DoCheck } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-adminnotifications',
  templateUrl: './adminnotifications.component.html',
  styleUrls: ['./adminnotifications.component.css']
})
export class AdminnotificationsComponent implements OnInit,DoCheck  {
  p:number;
  arr:object[]=[];
  arr2:object[]=[];
  notification:any;
  date:any;

  sen:object[]=[];
  constructor(private ds:DataService, private http:HttpClient){

  }
 
  ngOnInit() {
    }
    
ngDoCheck()
{
  this.http.get<any>('admin/adminnotifications').subscribe(temp=>{
    this.arr=temp;
  })
}
  addData(v)
  {
   //this.arr.push(v);
    this.notification='';
    this.date='';
    console.log(v);
    this.http.post<any>('admin/adminnotifications',v).subscribe(temp=>{
      this.arr=temp;
    })
    
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
        this.sen.push(y);
        this.ds.receiveData(y);
        this.ds.receiven(this.sen);
    }
    save(v)
    {

    }
}


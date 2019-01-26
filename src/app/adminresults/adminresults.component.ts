import { Component, OnInit, DoCheck } from '@angular/core';
import { DataService } from '../data.service';
import { from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-adminresults',
  templateUrl: './adminresults.component.html',
  styleUrls: ['./adminresults.component.css']
})


export class AdminresultsComponent implements DoCheck,OnInit  {
  p:number;
  arr:any={};
  arr2:any={};
  arr3:any={};
  sname:any;
  english:any;
  physics:any;
  chemistry:any;
  enggdrawing:any;
  maths:any;
  constructor(private ds:DataService, private http:HttpClient){

  }

  ngOnInit() {
    this.http.get<any>('admin/adminresults').subscribe(temp=>{
      this.arr=temp;
    })
    }

  ngDoCheck()
  {
    
  }
  addData(v)
  {
   // this.arr.push(v);
   this.http.post<any>('admin/adminresults',v).subscribe()
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
      var httpoptions={headers:new HttpHeaders({'Content-Type':'application/json'}),body:v};
      this.http.delete<any[]>('admin/adminresults',httpoptions).subscribe();
    }
    edit(i)
    {
      this.arr2=i;
      console.log(this.arr2);
      
    }
    send(y)
    {
        this.arr3.push(y);
        this.ds.receiveData(y);
        this.ds.receiver(this.arr3);
    }
    save()
    {
      console.log(this.arr2);
      this.http.put<any>('admin/adminresults',this.arr2).subscribe();
    }

}
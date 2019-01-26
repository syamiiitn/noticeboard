import { Component, OnInit, DoCheck } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-adminnotifications',
  templateUrl: './adminnotifications.component.html',
  styleUrls: ['./adminnotifications.component.css']
})
export class AdminnotificationsComponent implements OnInit,DoCheck  {
  p:number;
  arr:any={};
  arr2:any={};
  notification:any;
  date:any;
  searchTerm:any;
  

  sen:object[]=[];
  constructor(private ds:DataService, private http:HttpClient){

  }
 
  ngOnInit() {
    this.http.get<any>('admin/adminnotifications').subscribe(temp=>{
      this.arr=temp;
    })
    }
    
ngDoCheck()
{
 
}
  addData(v)
  {
   //this.arr.push(v);
    this.notification='';
    this.date='';
    console.log(v);
    this.http.post<any>('admin/adminnotifications',v).subscribe()
    
  }
  delete(v)
    {
      var httpoptions={headers:new HttpHeaders({'Content-Type':'application/json'}),body:v};
      this.http.delete<any[]>('admin/adminnotifications',httpoptions).subscribe();
    }
    edit(i)
    {
      this.arr2=i;
      console.log(i);
      
    }

    send(y)
    {
        this.sen.push(y);
        this.ds.receiveData(y);
        this.ds.receiven(this.sen);
    }
    save()
    {
      console.log(this.arr2);
      
      this.http.put('admin/adminnotifications',this.arr2).subscribe();
    }
}


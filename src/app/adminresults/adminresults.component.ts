import { Component, OnInit, DoCheck } from '@angular/core';
import { from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResultsService } from '../results.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminresults',
  templateUrl: './adminresults.component.html',
  styleUrls: ['./adminresults.component.css']
})


export class AdminresultsComponent implements DoCheck,OnInit  {
  p:number;
  arr:any=[];
  arr2:any={};
  arr3:any={};
  sname:any;
  english:any;
  physics:any;
  chemistry:any;
  enggdrawing:any;
  maths:any;
  searchingTerm:any;
  constructor(private http:HttpClient, private resultService:ResultsService, private router:Router) {}

  ngOnInit() {
    this.resultService.getAdminResults().subscribe(temp=>{
      if(temp['message']=='token is not valid')
      {
        alert(temp['message'])
        this.router.navigate(['home/login'])
      }
      else
      {
        this.arr=temp;
      }
      })
    }

  ngDoCheck()
  {
    
  }
  addData(v)
  {
   // this.arr.push(v);
   this.resultService.postAdminResults(v);
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
      this.resultService.deleteAdminResults(v);
    }
    edit(i)
    {
      this.arr2=i;
      console.log(this.arr2);
      
    }
    
    save()
    {
      console.log(this.arr2);
      this.resultService.editAdminResults(this.arr2);
    }

}
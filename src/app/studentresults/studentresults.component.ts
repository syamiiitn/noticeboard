import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResultsService } from '../results.service';
import { Router } from '@angular/router';
//import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-studentresults',
  templateUrl: './studentresults.component.html',
  styleUrls: ['./studentresults.component.css'],
  providers:[{provide:'Window',useValue:window}]
})
export class StudentresultsComponent implements OnInit {

  constructor(private http:HttpClient, private resultService:ResultsService, @Inject('Window') private window:Window, private router:Router) { }
  p:any;
  data:any;
  sname:any;
  english:any;
  physics:any;
  chemistry:any;
  enggdrawing:any;
  maths:any;
  searchingTerm:any;

  ngOnInit() 
  {
    this.resultService.getStudentResults().subscribe(temp=>{
      if(temp['message']=='token is not valid')
      {
        alert(temp['message'])
        this.router.navigate(['home/login'])
      }
      else
      {
        this.data=temp;
      }
      })
  
  }
 
  // downloadpdf()
  // {
  //   var doc=new jsPDF();
  //   doc.text(20,20,'welcome guru whatsup!');

  //   doc.save('test.pdf');
  //   }

}

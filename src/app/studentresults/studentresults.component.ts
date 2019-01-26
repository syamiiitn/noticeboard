import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
//import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-studentresults',
  templateUrl: './studentresults.component.html',
  styleUrls: ['./studentresults.component.css'],
  providers:[{provide:'Window',useValue:window}]
})
export class StudentresultsComponent implements OnInit {

  constructor(private http:HttpClient,@Inject('Window') private window:Window) { }
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
    this.http.get('student/studentresults').subscribe(temp=>this.data=temp)
  
  }
 
  // downloadpdf()
  // {
  //   var doc=new jsPDF();
  //   doc.text(20,20,'welcome guru whatsup!');

  //   doc.save('test.pdf');
  //   }

}

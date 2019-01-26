import { Component, OnInit, Inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
//import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-studentnotifications',
  templateUrl: './studentnotifications.component.html',
  styleUrls: ['./studentnotifications.component.css'],
  providers:[{provide:'Window',useValue:window}]
})
export class StudentnotificationsComponent implements OnInit {

  constructor(@Inject('Window') private window:Window, private http:HttpClient) { }
  p:number;
  data:any={};
  data1:any={};
  notification:any;
  date:any;
  searchTerm:any;
  
  ngOnInit():void
  {
    
   this.http.get('student/studentnotifications').subscribe(temp=>this.data=temp)
   console.log(this.data)
   
    
 
  }
  // downloadpdf()
  // {
  //   var doc=new jsPDF();
  //   doc.text(20,20,'welcome guru whatsup!');

  //   doc.save('test.pdf');
  //   }

}

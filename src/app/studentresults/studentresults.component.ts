import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../data.service';
//import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-studentresults',
  templateUrl: './studentresults.component.html',
  styleUrls: ['./studentresults.component.css'],
  providers:[{provide:'Window',useValue:window}]
})
export class StudentresultsComponent implements OnInit {

  constructor(private ds:DataService,@Inject('Window') private window:Window) { }
  p:number;
data:object;

  ngOnInit() 
  {
    this.data=this.ds.sendr();
  
  }
 
  // downloadpdf()
  // {
  //   var doc=new jsPDF();
  //   doc.text(20,20,'welcome guru whatsup!');

  //   doc.save('test.pdf');
  //   }

}

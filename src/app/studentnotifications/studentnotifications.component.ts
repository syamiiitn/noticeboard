import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../data.service';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-studentnotifications',
  templateUrl: './studentnotifications.component.html',
  styleUrls: ['./studentnotifications.component.css'],
  providers:[{provide:'Window',useValue:window}]
})
export class StudentnotificationsComponent implements OnInit {

  constructor(private ds:DataService,@Inject('Window') private window:Window) { }
  p:number;
  data:object;
  data1:object[]=[];
  ngOnInit() 
  {
    
    this.data=this.ds.sendn();
 
  }
  downloadpdf()
  {
    var doc=new jsPDF();
    doc.text(20,20,'welcome guru whatsup!');

    doc.save('test.pdf');
    }

}

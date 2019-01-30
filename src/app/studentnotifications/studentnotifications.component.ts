import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationsService } from '../notifications.service';
import { Router } from '@angular/router';
//import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-studentnotifications',
  templateUrl: './studentnotifications.component.html',
  styleUrls: ['./studentnotifications.component.css'],
  providers:[{provide:'Window',useValue:window}]
})
export class StudentnotificationsComponent implements OnInit {

  constructor(@Inject('Window') private window:Window, private http:HttpClient, private notificationService:NotificationsService, private router:Router) { }
  p:number;
  data:any=[];
  data1:any={};
  notification:any;
  date:any;
  searchTerm:any;
  
  ngOnInit():void
  {
    this.notificationService.getStudentNotifications().subscribe(temp=>{
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

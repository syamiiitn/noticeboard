import { Component, OnInit, DoCheck } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { NotificationsService } from '../notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminnotifications',
  templateUrl: './adminnotifications.component.html',
  styleUrls: ['./adminnotifications.component.css']
})
export class AdminnotificationsComponent implements OnInit,DoCheck  {
  p:number;
  arr:any=[];
  arr2:any={};
  notification:any;
  date:any;
  searchTerm:any;
  

  
  constructor(private http:HttpClient, private notificationsService:NotificationsService, private router:Router){

  }
 
  ngOnInit() {
    this.notificationsService.getAdminNotifications().subscribe(temp=>{
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
   //this.arr.push(v);
    this.notification='';
    this.date='';
    console.log(v);
    this.notificationsService.postAdminNotifications(v);
    
  }
  delete(v)
    {
      this.notificationsService.deleteAdminNotificatios(v);
    }
    edit(i)
    {
      this.arr2=i;
      console.log(i);
      
    }

    save()
    {
      this.notificationsService.editAdminNotifications(this.arr2);
    }
}


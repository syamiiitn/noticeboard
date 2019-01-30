import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http:HttpClient) { }

  postAdminNotifications(v)
  {
    this.http.post<any>('api/admin/adminnotifications',v).subscribe();
  }
  getAdminNotifications():Observable<any>
  {
    return this.http.get<any>('api/admin/adminnotifications');
  }
  editAdminNotifications(v)
  {
    this.http.put('api/admin/adminnotifications',v).subscribe();
  }
  deleteAdminNotificatios(v)
  {
    var httpOptions={headers:new HttpHeaders({'Content-Type':'application/json'}),body:v};
    this.http.delete<any[]>('api/admin/adminnotifications',httpOptions).subscribe();
  }
  getStudentNotifications():Observable<any>
  {
    return this.http.get<any>('api/student/studentnotifications');
  }
}

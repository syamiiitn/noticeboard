import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }
  getAdminProfile():Observable<any>
  {
    return this.http.get<any>('api/admin/adminprofile');
  }
  editAdminProfile(v)
  {
    this.http.put('api/admin/adminprofile',v).subscribe();
  }

  getStudentProfile():Observable<any>
  {
    return this.http.get<any>('api/student/studentprofile');
  }
  editStudentProfile(v)
  {
    this.http.put('api/student/studentprofile',v).subscribe();
  }
}

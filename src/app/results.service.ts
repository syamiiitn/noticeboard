import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  constructor(private http:HttpClient) { }
  postAdminResults(v)
  {
    this.http.post<any>('api/admin/adminresults',v).subscribe();
  }
  getAdminResults():Observable<any>
  {
    return this.http.get<any>('api/admin/adminresults');
  }
  editAdminResults(v)
  {
    this.http.put<any>('api/admin/adminresults',v).subscribe();
  }
  deleteAdminResults(v)
  {
    var httpOptions={headers:new HttpHeaders({'Content-Type':'application/json'}),body:v};
    this.http.delete<any[]>('api/admin/adminresults',httpOptions).subscribe();
  }
  getStudentResults():Observable<any>
  {
    return this.http.get<any>('api/student/studentresults');
  }
}

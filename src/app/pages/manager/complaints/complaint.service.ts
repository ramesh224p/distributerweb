import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  private url = `${environment.apiBaseUrl}/v1`;

  constructor(private http: HttpClient) { }

  getComplaints() {
    return this.http.get(`${this.url}/complaints`);
  }

  createComplaints(itemobj){
    return this.http.post( `${this.url}/complaints`, itemobj);
  }
  
  editComplaints(id, itemedit) {
  return this.http.put(`${this.url}/complaints/` + id, itemedit);
  }

  deleteComplaints(id) {
    return this.http.delete(`${this.url}/complaints/` + id);
  }

}

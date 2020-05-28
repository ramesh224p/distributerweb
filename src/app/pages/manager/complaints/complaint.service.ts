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

  createComplaints(itemobj) {
    let httpheaders = new HttpHeaders()
      .set('content-type', 'application/json');
    let options = {
      headers: httpheaders
    };
    return this.http.post(`${this.url}/complaints`, itemobj, options);
  }

  editComplaints(id, itemedit) {
    let httpheaders = new HttpHeaders()
      .set('content-type', 'application/json');
    let options = {
      headers: httpheaders
    };
  return this.http.put(`${this.url}/complaints/` + id, itemedit, options);
  }

  deleteComplaints(id) {
    return this.http.delete(`${this.url}/complaints/` + id);
  }

}

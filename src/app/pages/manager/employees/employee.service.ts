import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url = `${environment.apiBaseUrl}/v1`;

  constructor(private http: HttpClient) { }

  getEmployees() {
    return this.http.get(`${this.url}/employees`);
  }

  createEmployee(itemobj) {
    return this.http.post(`${this.url}/employees`, itemobj);
  }

  editEmployee(id, itemedit) {
  return this.http.put(`${this.url}/employees/` + id, itemedit);
  }

  deleteEmployee(id) {
    return this.http.delete(`${this.url}/employees/` + id);
  }

}

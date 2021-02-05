import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  private url = `${environment.apiBaseUrl}/v1`;

  constructor(private http: HttpClient) { }

  getFinances(){
    return this.http.get(`${this.url}/finances`);
  }

  createFinances(itemobj){
    return this.http.post(`${this.url}/finances`, itemobj);
  }

  editFinances(id, itemedit){
  return this.http.put(`${this.url}/finances/`+id, itemedit);
  }

  deleteFinances(id){
    return this.http.delete(`${this.url}/finances/`+id);
  }


}

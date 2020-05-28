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
    let httpheaders= new HttpHeaders()
      .set('content-type','application/json');
    let options={
      headers:httpheaders
    }
    return this.http.post(`${this.url}/finances`, itemobj, options);
  }

  editFinances(id, itemedit){
    let httpheaders= new HttpHeaders()
      .set('content-type','application/json');
    let options={
      headers:httpheaders
    }
  return this.http.put(`${this.url}/finances/`+id, itemedit, options);
  }

  deleteFinances(id){
    return this.http.delete(`${this.url}/finances/`+id);
  }


}

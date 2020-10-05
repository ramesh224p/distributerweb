import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndentService {

  private url = `${environment.apiBaseUrl}/v1`;

  constructor(private http: HttpClient) { }

  getIndent(){
    return this.http.get(`${this.url}/indents`);
  }

  createIndent(itemobj){
    return this.http.post(`${this.url}/indents`, itemobj);
  }

  editIndent(id, itemedit){
  return this.http.put(`${this.url}/indents/`+id, itemedit);
  }

  deleteIndent(id){
    return this.http.delete(`${this.url}/indents/`+id);
  }

}

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
    console.log(`${this.url}/indents`);
    console.log('hi')
    return this.http.get(`${this.url}/indents`);
  }

  createIndent(itemobj){
    let httpheaders= new HttpHeaders()
      .set('content-type','application/json');
    let options={
      headers:httpheaders
    }
    return this.http.post(`${this.url}/indents`, itemobj, options);
  }

  editIndent(id, itemedit){
    let httpheaders= new HttpHeaders()
      .set('content-type','application/json');
    let options={
      headers:httpheaders
    }
  return this.http.put(`${this.url}/indents/`+id, itemedit, options);
  }

  deleteIndent(id){
    return this.http.delete(`${this.url}/indents/`+id);
  }

}

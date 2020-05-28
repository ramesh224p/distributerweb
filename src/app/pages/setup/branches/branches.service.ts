import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  private url = `${environment.apiBaseUrl}/v1`;

  constructor(private http: HttpClient) { }

  getBranches(){
    return this.http.get(`${this.url}/branches`);
  }

  createBranch(itemobj){
    let httpheaders= new HttpHeaders()
      .set('content-type','application/json');
    let options={
      headers:httpheaders
    }
    return this.http.post(`${this.url}/branches`, itemobj, options);
  }

  editBranch(id, itemedit){
    let httpheaders= new HttpHeaders()
      .set('content-type','application/json');
    let options={
      headers:httpheaders
    }
  return this.http.put(`${this.url}/branches/`+id, itemedit, options);
  }

  deleteBranch(id){
    return this.http.delete(`${this.url}/branches/`+id);
  }

}

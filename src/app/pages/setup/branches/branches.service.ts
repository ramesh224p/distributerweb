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
    return this.http.post(`${this.url}/branches`, itemobj);
  }

  editBranch(id, itemedit){
  return this.http.put(`${this.url}/branches/`+id, itemedit);
  }

  deleteBranch(id){
    return this.http.delete(`${this.url}/branches/`+id);
  }

}

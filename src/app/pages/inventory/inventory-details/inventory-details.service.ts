import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryDetailsService {

  private url = `${environment.apiBaseUrl}/v1`;

  constructor(private http: HttpClient) { }

  getInventory() {
    return this.http.get(`${this.url}/inventory`);
  }

  createInventory(itemobj) {
    return this.http.post(`${this.url}/inventory`, itemobj);
  }

  editInventory(id, itemedit) {
  return this.http.put(`${this.url}/inventory/` + id, itemedit);
  }

  deleteInventory(id) {
    return this.http.delete(`${this.url}/inventory/` + id);
  }

}

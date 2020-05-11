import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class IndexService {
    private url = `${environment.apiBaseUrl}/v1`;
    constructor(private http: HttpClient){}
    getEmployeeData(){
        return this.http.get(`${this.url}/employees`);
    }
    getBranchesData(){
        return this.http.get(`${this.url}/branches`);
    }
}
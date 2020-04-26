import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: []
})
export class IndexComponent implements OnInit {
  showloading: boolean = false;

  private url = `${environment.apiBaseUrl}/v1`;
  employees;
  branches;

  public AnimationBarOption;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(`${this.url}/employees`).subscribe(data => {
      this.employees=Object.keys(data['data']).length
      console.log(this.employees);
    })
    this.http.get(`${this.url}/branches`).subscribe(data => {
      this.branches=Object.keys(data['data']).length
      console.log(this.branches);
    })
  }
}

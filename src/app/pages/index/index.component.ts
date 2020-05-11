import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IndexService } from './index.service';

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

  constructor(private http: HttpClient, private indexservice:IndexService) { }

  getIndexEmployee(){
      this.indexservice.getEmployeeData().subscribe(data => {
          this.employees=Object.keys(data['data']).length
          console.log(this.employees);
        })
  }

  getIndexcomplaint(){
    this.indexservice.getBranchesData().subscribe(data => {
        this.branches=Object.keys(data['data']).length
        console.log(this.branches);
      })
  }

  ngOnInit() {
    this.getIndexEmployee();
    this.getIndexcomplaint();
    // this.http.get(`${this.url}/employees`).subscribe(data => {
    //   this.employees=Object.keys(data['data']).length
    //   console.log(this.employees);
    // })
    // this.http.get(`${this.url}/branches`).subscribe(data => {
    //   this.branches=Object.keys(data['data']).length
    //   console.log(this.branches);
    // })
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IndexService } from './index.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: []
})
export class IndexComponent implements OnInit {
  showloading = false;

  private url = `${environment.apiBaseUrl}/v1`;
  employees;
  branches;

  public AnimationBarOption;

  constructor(private http: HttpClient, private indexservice:  IndexService) { }

  getIndexEmployee() {
      this.indexservice.getEmployeeData().subscribe(data => {
        // console.log(data);
        if (data['status'] === true) {
        this.employees = data['data'].length;
        // console.log(this.employees);
        } else {
          this.employees = 0;
        }
      });
  }

  getIndexcomplaint() {
    this.indexservice.getBranchesData().subscribe(data => {
      // console.log(data);
      if (data['status'] === true) {
        this.branches = data['data'].length;
        // console.log(this.branches);
      } else {
        let user = JSON.parse(localStorage.getItem('userData'));
        this.branches = 0;
      }
      });
  }

  ngOnInit() {
    this.getIndexEmployee();
    this.getIndexcomplaint();
  }
}

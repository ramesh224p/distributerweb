import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor(private http: HttpClient) { }
  private url = `${environment.apiBaseUrl}/v1`;
  employees: any;
  branches: any;
  finances: any;
  complaints: any;
  w: any;
  x: any;
  y: any;
  z: any;

  ngOnInit() {
    this.http.get(`${this.url}/employees`).subscribe(data => {
      if (data['status'] === true) {
        this.employees = data['data'].length;
        if(this.w != this.employees)
        localStorage.removeItem("employees");
        localStorage.setItem("employees", this.employees);
        console.log(this.employees)
      } else {
        this.employees = 0;
      }
    });

    this.http.get(`${this.url}/branches`).subscribe(data => {
      if (data['status'] === true) {
        this.branches = data['data'].length;
        if(this.x != this.branches)
          localStorage.removeItem("branches");
        localStorage.setItem("branches", this.branches);
        console.log(this.branches)
      } else {
        this.branches = 0;
      }
    });
    
    this.http.get(`${this.url}/complaints`).subscribe(data => {
      if (data['status'] === true) { 
        this.complaints = data['data'].length;
        if(this.y != this.complaints)
        localStorage.removeItem("complaints");
        localStorage.setItem("complaints", this.complaints);
      } else {
        let user = JSON.parse(localStorage.getItem('userData'));
        this.branches = 0;
      }
    });

    this.http.get(`${this.url}/finances`).subscribe(data => {
      if (data['status'] === true) {
        this.finances = data['data'].length;
        if(this.z != this.finances)
        localStorage.removeItem("finances");
        localStorage.setItem("finances", this.finances);
      } else {
        let user = JSON.parse(localStorage.getItem('userData'));
        this.branches = 0;
      }
    });

    setTimeout(myFunction, 300);

    function myFunction(){
      this.w = localStorage.getItem("employees");
      this.x =localStorage.getItem("branches");
      this.y = localStorage.getItem("complaints");
      this.z =localStorage.getItem("finances");
      console.log(this.w, this.x, this.y, this.z)
    }


    setTimeout(myFunctions, 400);
    
   function myFunctions(){ 
    var myChart = new Chart("myChart", {
      type: 'line',
      data: {
        labels: ['employees', 'branches', 'complaints','finances'],
        datasets: [{
          label: 'members',
          data: [ this.w, this.x, this.y, this.z ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
            // 'rgba(153, 102, 255, 0.2)',
            // 'rgba(255, 159, 64, 0.2)'
          ],
          // borderColor: [
          //   'rgba(255, 99, 132, 1)',
          //   'rgba(54, 162, 235, 1)',
          //   'rgba(255, 206, 86, 1)',
          //   'rgba(75, 192, 192, 1)',
          //   'rgba(153, 102, 255, 1)',
          //   'rgba(255, 159, 64, 1)'
          // ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  }
}
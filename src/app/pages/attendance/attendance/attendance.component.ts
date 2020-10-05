import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  private url = `${environment.apiBaseUrl}/v1`;
  Email;
  Password;
  emails;
  email;
  password;
  passwords;
  attendance = [];
  user;
  status;
  attnd_id;
  emp_id;
  time;
  emp_name: '';
  public emailPattern = '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$';
  loginForm: FormGroup;

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Password: new FormControl('', Validators.required),
      Email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
        Validators.maxLength(20),
      ]),
    });
  } 

  attendanceLogin() {
    let log = {
      email: this.emails,
      password: this.passwords
    };
    this.http.post(`${this.url}/attendance/`, log).subscribe(data => {
      console.log(data['data'][0]);
      this.emp_id = 0;
      if (data['status'] === true) {
        let log1 = {
          emp_name : data['data'][0]['emp_first_name'],
          emp_id : data['data'][0]['id']
        }
        this.http.post(`${this.url}/attendance/`, log1).subscribe(data =>{
          console.log(data['data']['result']['insertId']);
          this.attendance = data['data']['data'];
          this.attnd_id = data['data']['result']['insertId'];
        })
        console.log("sucess");
        // this.router.navigate(['/pages/index']);
      }
    });
  }

  logout() {
    this.status = "2";
    this.http.put(`${this.url}/attendance/`+this.attnd_id, this.status ).subscribe(data =>{
      console.log(data['data']['data']);
      this.emp_id = 0;
      this.router.navigate(['/pages/index']);
    })
  }

}

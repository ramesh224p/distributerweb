import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private url = `${environment.apiBaseUrl}/v1`;
  emp_email: '';
  Passwords;
  private emails;
  email;
  password;
  public emailPattern = '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$';
  loginForm: FormGroup;

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      password: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
        Validators.maxLength(20),
      ]),
    });
  } 

  login(){
    var log={
      emp_email:this.emails,
      password:this.Passwords
    }
    console.log(log);
    this.http.post(`${this.url}/login/`,log).subscribe(data => {
      console.log(data);
      if(data['status'] == true){
        localStorage.setItem('token', data['val']['token']);
        this.router.navigate(['/pages/index']);
      }
    })
  }

}
